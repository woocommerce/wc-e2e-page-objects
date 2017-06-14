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
import { WPAdminWCSettingsShippingZones, WPAdminWCSettingsSingleShippingZone } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'WooCommerce Shipping Settings', function() {
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
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=shipping' ) };
		const settings = new WPAdminWCSettingsShippingZones( driver, settingsArgs );

		assert.eventually.ok( settings.hasActiveTab( 'Shipping' ) );
		assert.eventually.ok( settings.hasActiveSubTab( 'Shipping zones' ) );

		settings.addShippingZone();

		const zone = new WPAdminWCSettingsSingleShippingZone( driver );
		zone.setZoneName( "Test" );
		zone.addZoneRegion( "alabama", "Alabama" );
		driver.sleep( 1000 );
		zone.removeZoneRegion( "ZAlabama" );
		zone.openLimitToSpecificZipCodes();
		driver.sleep( 5000 );

	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
