/**
 * External dependencies
 */
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPLogin } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import { WPAdminWCSettingsTax , WPAdminWCSettingsTaxRates } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'WooCommerce Tax Settings', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login', () => {
		const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
		wpLogin.login( config.get( 'users.admin.username' ), config.get( 'users.admin.password' ) );
	} );
/*
	test.it( 'can set tax options', () => {
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=tax' ) };
		const settings = new WPAdminWCSettingsTax( driver, settingsArgs );

		assert.eventually.ok( settings.hasActiveTab( 'Tax' ) );

		settings.selectPricesEnteredWithNoTax();
		settings.selectCalculateTaxBasedOn( 'Customer shipping address' );
		settings.selectShippingTaxClass( 'Standard' );
		settings.uncheckRounding();
		settings.selectDisplayPricesInTheShop( 'Excluding tax' );
		settings.selectDisplayPricesDuringCartAndCheckout( 'Including tax' );
		settings.selectDisplayTaxTotals( 'As a single total' );

		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );
	} );

	test.it( 'can add and remove tax classes', () => {
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=tax' ) };
		const settings = new WPAdminWCSettingsTax( driver, settingsArgs );

		settings.removeAdditionalTaxClasses();
		settings.saveChanges();

		settings.addAdditionalTaxClass( 'Fancy rate' );
		settings.saveChanges();

		assert.eventually.ok( settings.hasSubTab( 'Fancy rate rates' ) );

		settings.removeAdditionalTaxClass( 'Fancy rate' );
		settings.saveChanges();

		assert.eventually.ifError( settings.hasSubTab( 'Fancy rate rates' ) );
	} );
*/
	test.it( 'can do something', () => {
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=tax&section=standard' ) };
		const settings = new WPAdminWCSettingsTaxRates( driver, settingsArgs );

		settings.insertRow();
		settings.insertRow();

		settings.setCountryCode( 1, 'us' );
		settings.setCountryCode( 2, 'ar' );
		settings.setStateCode( 2, 'ca' );
		settings.setStateCode( 1, 'or' );
		settings.setCity( 2, 'Portland' );
		settings.setCity( 1, 'Somewhere' );
		settings.setRate( 1, '12' );
		settings.setRate( 2, '15' );
		settings.setTaxName( 1, 'First' );
		settings.setTaxName( 2, 'Cool tax' );
		settings.setPriority( 1, '2' );
		settings.setPriority( 2, '3' );
		settings.checkCompound( 1 );
		settings.checkCompound( 2 );
		settings.uncheckCompound( 1 );
		settings.uncheckCompound( 2 );
		settings.checkShipping( 3 );
		settings.uncheckShipping( 3 );
		driver.sleep( 4000 );

		settings.removeRow( 2 );
		driver.sleep( 10000 );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
