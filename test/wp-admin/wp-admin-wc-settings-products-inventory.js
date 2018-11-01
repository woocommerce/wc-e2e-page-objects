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
import { WPAdminWCSettingsProductsInventory } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'WooCommerce Products > Inventory Products Settings', function() {
	// open browser
	test.before( function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// login
	test.before( () => {
		const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
		wpLogin.login( config.get( 'users.admin.username' ), config.get( 'users.admin.password' ) );
	} );

	test.it( 'can update settings', () => {
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=products&section=inventory' ) };
		const settings = new WPAdminWCSettingsProductsInventory( driver, settingsArgs );

		assert.eventually.ok( settings.hasActiveTab( 'Products' ) );
		assert.eventually.ok( settings.hasActiveSubTab( 'Inventory' ) );

		// Enable stock management flow
		settings.checkEnableStockManagement();
		settings.setHoldStockMinutes( '60' );
		settings.checkEnableLowStockNotifications();
		settings.checkEnableOutOfStockNotifications();
		settings.setNotificationRecipients( 'woologin@woocommerce.com' );
		settings.setLowStockThreshold( '5' );
		settings.setOutOfStockThreshold( '0' );
		settings.checkEnableHideOutOfStockItemsFromTheCatalog();
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Enable stock management but disable all other checkboxes on the page flow
		settings.uncheckEnableLowStockNotifications();
		settings.uncheckEnableOutOfStockNotifications();
		settings.uncheckEnableHideOutOfStockItemsFromTheCatalog();
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Disable stock management flow
		settings.uncheckEnableStockManagement();
		settings.selectStockDisplayFormat( 'Never show quantity remaining in stock' );
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );
	} );

	// quit browser
	test.after( () => {
		manager.quitBrowser();
	} );
} );
