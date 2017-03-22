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

	test.it( 'can do something', () => {
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=tax' ) };
		const settings = new WPAdminWCSettingsTax( driver, settingsArgs );

		assert.eventually.ok( settings.hasActiveTab( 'Tax' ) );

		settings.selectPricesEnteredWithTax();
		driver.sleep( 1000 );

		settings.selectPricesEnteredWithNoTax();
		driver.sleep( 1000 );

		settings.checkRounding();
		driver.sleep( 1000 );

		settings.setPriceDisplaySuffix( 'inc. Vat' );
		driver.sleep( 1000 );

		settings.uncheckRounding();
		driver.sleep( 1000 );

		settings.selectCalculateTaxBasedOn( 'Customer shipping address' );
		driver.sleep( 1000 );

		settings.selectCalculateTaxBasedOn( 'Customer billing address' );
		driver.sleep( 1000 );

		settings.selectCalculateTaxBasedOn( 'Shop base address' );
		driver.sleep( 1000 );

		settings.selectDisplayPricesInTheShop( 'Including tax' );
		driver.sleep( 1000 );

		settings.selectDisplayTaxTotals( 'As a single total' );
		driver.sleep( 1000 );

		settings.setPriceDisplaySuffix( 'billz' );
		driver.sleep( 1000 );

		settings.selectDisplayPricesDuringCartAndCheckout( 'Excluding tax' );
		driver.sleep( 1000 );

		settings.selectDisplayPricesInTheShop( 'Excluding tax' );
		driver.sleep( 1000 );

		settings.selectDisplayTaxTotals( 'Itemized' );
		driver.sleep( 1000 );

		settings.selectDisplayPricesDuringCartAndCheckout( 'Including tax' );
		driver.sleep( 1000 );

		settings.addAdditionalTaxClass( 'test class' );
		driver.sleep( 1000 );

		settings.removeAdditionalTaxClass( 'Zero rate' );
		driver.sleep( 1000 );

		settings.addAdditionalTaxClass( 'another one' );
		driver.sleep( 1000 );

		settings.addAdditionalTaxClass( 'lets start over' );
		driver.sleep( 1000 );

		settings.removeAdditionalTaxClass( 'lets start over' );
		driver.sleep( 1000 );

		settings.removeAdditionalTaxClass( 'test class' );
		driver.sleep( 1000 );


/*
		// Set selling location to all countries first, so we can choose california
		// as base location.
		settings.selectSellingLocation( 'Sell to all countries' );
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Set base location with state CA.
		settings.selectBaseLocation( 'california', 'United States (US) — California' );
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Set selling location to specific countries first, so we can choose
		// U.S as base location (without state). This will makes specific
		// countries option appears.
		settings.selectSellingLocation( 'Sell to specific countries' );
		settings.removeChoiceInSellToSpecificCountries( 'United States (US)' );
		settings.setSellToSpecificCountries( 'united states', 'United States (US)' );
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Set currency options.
		settings.setThousandSeparator( ',' );
		settings.setDecimalSeparator( '.' );
		settings.setNumberOfDecimals( '2' );

		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );*/
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
