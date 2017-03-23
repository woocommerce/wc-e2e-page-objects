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
import { WPAdminWCSettingsTax } from '../../src/index';

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

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
