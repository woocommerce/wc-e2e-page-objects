/**
 * External dependencies
 */
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import * as wcHelper from '../src/helper';
import { PageMap, CheckoutOrderReceivedPage, StoreOwnerFlow, GuestCustomerFlow } from '../src/index';

chai.use( chaiAsPromised );

const assert = chai.assert;
const PAGE = PageMap.PAGE;
const storeOwnerFlowArgs = {
	baseUrl: config.get( 'url' ),
	username: config.get( 'users.admin.username' ),
	password: config.get( 'users.admin.password' )
};

let manager;
let driver;

test.describe( 'Checkout Page', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.it( 'should displays cart items in order review', () => {
		const guest = new GuestCustomerFlow( driver, { baseUrl: config.get( 'url' ) } );
		guest.fromShopAddProductsToCart( 'Flying Ninja', 'Happy Ninja' );

		// TODO: Make sure tax and shipping is set in setting.

		const checkoutPage = guest.openCheckout();
		assert.eventually.ok( wcHelper.waitTillUIBlockNotPresent( driver ) );
		const orderReview = checkoutPage.components.orderReview;
		assert.eventually.ok( orderReview.hasItem( 'Flying Ninja', { qty: '1', total: '$12.00' } ) );
		assert.eventually.ok( orderReview.hasItem( 'Happy Ninja', { qty: '1', total: '$18.00' } ) );
		assert.eventually.ok( orderReview.hasSubtotal( '$30.00' ) );
		assert.eventually.ok( orderReview.hasShipping( 'Flat Rate: $3.00' ) );
		assert.eventually.ok( orderReview.hasTax( '$4.95' ) );
		assert.eventually.ok( orderReview.hasTotal( '$37.95' ) );
	} );

	test.it( 'allows customer to choose available payment methods', () => {
		// Make sure payment method is set in setting.
		const storeOwner = new StoreOwnerFlow( driver, storeOwnerFlowArgs );
		storeOwner.enableBACS();
		storeOwner.enableCOD();
		storeOwner.enablePayPal();
		storeOwner.logout();

		const guest = new GuestCustomerFlow( driver, { baseUrl: config.get( 'url' ) } );
		guest.fromShopAddProductsToCart( 'Flying Ninja', 'Happy Ninja' );

		const checkoutPage = guest.openCheckout();
		assert.eventually.ok( wcHelper.waitTillUIBlockNotPresent( driver ) );
		assert.eventually.ok( checkoutPage.selectPaymentMethod( 'PayPal' ) );
		assert.eventually.ok( checkoutPage.selectPaymentMethod( 'Direct Bank Transfer' ) );
		assert.eventually.ok( checkoutPage.selectPaymentMethod( 'Cash on Delivery' ) );
	} );

	test.it( 'allows customer to fill billing details', () => {
		// Sets selling location to all countries to allow customer sets billing
		// country.
		const storeOwner = new StoreOwnerFlow( driver, storeOwnerFlowArgs );
		const settings = storeOwner.openGeneralSettings();
		settings.selectSellingLocation( 'Sell to All Countries' );
		settings.saveChanges();
		storeOwner.logout();

		const guest = new GuestCustomerFlow( driver, { baseUrl: config.get( 'url' ) } );
		guest.fromShopAddProductsToCart( 'Flying Ninja', 'Happy Ninja' );

		const checkoutPage = guest.open( PAGE.CHECKOUT );
		assert.eventually.ok( wcHelper.waitTillUIBlockNotPresent( driver ) );

		const billingDetails = checkoutPage.components.billingDetails;
		assert.eventually.ok( billingDetails.setFirstName( 'John' ) );
		assert.eventually.ok( billingDetails.setLastName( 'Doe' ) );
		assert.eventually.ok( billingDetails.setCompany( 'Automattic' ) );
		assert.eventually.ok( billingDetails.setEmail( 'john.doe@example.com' ) );
		assert.eventually.ok( billingDetails.setPhone( '123456789' ) );
		assert.eventually.ok( billingDetails.selectCountry( 'united states', 'United States (US)' ) );
		assert.eventually.ok( billingDetails.setAddress1( 'addr 1' ) );
		assert.eventually.ok( billingDetails.setAddress2( 'addr 2' ) );
		assert.eventually.ok( billingDetails.setCity( 'San Francisco' ) );
		assert.eventually.ok( billingDetails.selectState( 'cali', 'California' ) );
		assert.eventually.ok( billingDetails.setZip( '94107' ) );
	} );

	test.it( 'allows customer to fill shipping details', () => {
		const guest = new GuestCustomerFlow( driver, { baseUrl: config.get( 'url' ) } );
		guest.fromShopAddProductsToCart( 'Flying Ninja', 'Happy Ninja' );

		const checkoutPage = guest.open( PAGE.CHECKOUT );
		assert.eventually.ok( wcHelper.waitTillUIBlockNotPresent( driver ) );
		assert.eventually.ok( checkoutPage.checkShipToDifferentAddress() );

		const shippingDetails = checkoutPage.components.shippingDetails;
		assert.eventually.ok( shippingDetails.setFirstName( 'John' ) );
		assert.eventually.ok( shippingDetails.setLastName( 'Doe' ) );
		assert.eventually.ok( shippingDetails.setCompany( 'Automattic' ) );
		assert.eventually.ok( shippingDetails.selectCountry( 'united states', 'United States (US)' ) );
		assert.eventually.ok( shippingDetails.setAddress1( 'addr 1' ) );
		assert.eventually.ok( shippingDetails.setAddress2( 'addr 2' ) );
		assert.eventually.ok( shippingDetails.setCity( 'San Francisco' ) );
		assert.eventually.ok( shippingDetails.selectState( 'cali', 'California' ) );
		assert.eventually.ok( shippingDetails.setZip( '94107' ) );
	} );

	test.it( 'allows guest customer to place order', () => {
		// Sets selling location to all countries to allow customer sets billing
		// country.
		const storeOwner = new StoreOwnerFlow( driver, storeOwnerFlowArgs );
		const settings = storeOwner.openGeneralSettings();
		settings.selectSellingLocation( 'Sell to All Countries' );
		settings.saveChanges();
		storeOwner.logout();

		const guest = new GuestCustomerFlow( driver, { baseUrl: config.get( 'url' ) } );
		guest.fromShopAddProductsToCart( 'Flying Ninja', 'Happy Ninja' );

		const checkoutPage = guest.open( PAGE.CHECKOUT );
		const billingDetails = checkoutPage.components.billingDetails;
		wcHelper.waitTillUIBlockNotPresent( driver );
		billingDetails.setFirstName( 'John' );
		billingDetails.setLastName( 'Doe' );
		billingDetails.setCompany( 'Automattic' );
		billingDetails.setEmail( 'john.doe@example.com' );
		billingDetails.setPhone( '123456789' );
		billingDetails.selectCountry( 'united states', 'United States (US)' );
		billingDetails.setAddress1( 'addr 1' );
		billingDetails.setAddress2( 'addr 2' );
		billingDetails.setCity( 'San Francisco' );
		billingDetails.selectState( 'cali', 'California' );
		billingDetails.setZip( '94107' );
		checkoutPage.selectPaymentMethod( 'Cash on Delivery' );
		checkoutPage.placeOrder();
		wcHelper.waitTillUIBlockNotPresent( driver );

		const orderReceivedPage = new CheckoutOrderReceivedPage( driver, { visit: false } );

		assert.eventually.ok(
			orderReceivedPage.hasText( 'Order Received' )
		);
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
