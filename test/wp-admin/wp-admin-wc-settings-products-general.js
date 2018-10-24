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
import { WPAdminWCSettingsProductsGeneral } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'WooCommerce Products > General Settings', function() {
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
		const settingsArgs = { url: manager.getPageUrl( '/wp-admin/admin.php?page=wc-settings&tab=products&section' ) };
		const settings = new WPAdminWCSettingsProductsGeneral( driver, settingsArgs );

		assert.eventually.ok( settings.hasActiveTab( 'Products' ) );
		assert.eventually.ok( settings.hasActiveSubTab( 'General' ) );

		// Set shop page to Shop
		settings.selectShopPage( 'Shop' );

		// Select add to cart behaviour options
		settings.checkRedirectToTheCartAfterSuccessfulAddition();
		settings.checkEnableAjaxAddToCartButtonsOnArchives();

		// Set measurements (kg, m)
		settings.selectWeightUnit( 'kg' );
		settings.selectDimensionsUnit( 'm' );

		// Select the checkbox to enable reviews so that the corresponding fields appear.
		// Set the rest of the settings in the Reviews section
		settings.checkEnableProductReviews();
		settings.checkShowVerifiedOwnerLabel();
		settings.checkOnlyAllowReviewsFromVerifiedOwners();
		settings.checkEnableRatingsOnReviews();
		settings.checkRatingsAreRequiredToLeaveReview();
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Deselect add to cart behaviour options
		settings.uncheckRedirectToTheCartAfterSuccessfulAddition();
		settings.uncheckEnableAjaxAddToCartButtonsOnArchives();
		// Set measurements (lbs, in)
		settings.selectWeightUnit( 'lbs' );
		settings.selectDimensionsUnit( 'in' );
		// Select the checkbox to disable reviews so that the corresponding fields disappear.
		settings.uncheckEnableProductReviews();
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );

		// Select add to cart behaviour options
		settings.checkRedirectToTheCartAfterSuccessfulAddition();
		settings.checkEnableAjaxAddToCartButtonsOnArchives();
		// Set measurements (oz, yd)
		settings.selectWeightUnit( 'oz' );
		settings.selectDimensionsUnit( 'yd' );
		// Select the checkbox to enable reviews so that the corresponding fields appear.
		// Set the rest of the settings in the Reviews section
		settings.checkEnableProductReviews();
		settings.checkShowVerifiedOwnerLabel();
		settings.checkOnlyAllowReviewsFromVerifiedOwners();
		settings.checkEnableRatingsOnReviews();
		settings.checkRatingsAreRequiredToLeaveReview();
		settings.saveChanges();
		assert.eventually.ok( settings.hasNotice( 'Your settings have been saved.' ) );
	} );

	// take screenshot
	test.afterEach( function() {
		if ( this.currentTest.state === 'failed' ) {
			helper.takeScreenshot( manager, this.currentTest );
		}
	} );

	// quit browser
	test.after( () => {
		manager.quitBrowser();
	} );
} );
