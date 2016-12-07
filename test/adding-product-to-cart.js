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
import { ShopPage, CartPage } from '../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.before( 'Setup browser', function() {
	this.timeout( config.get( 'startBrowserTimeoutMs' ) );

	manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
	driver = manager.getDriver();

	helper.clearCookiesAndDeleteLocalStorage( driver );
} );

test.describe( 'Test adding product to cart', function() {
	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.it( 'Should displays no item in the cart', () => {
		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		assert.eventually.equal( cartPage.hasNoItem(), true );
	} );

	test.it( 'Should adds the product to the cart when "Add to cart" is clicked', () => {
		const shopPage = new ShopPage( driver, { url: manager.getPageUrl( '/shop' ) } );
		assert.eventually.equal( shopPage.addProductToCart( 'Flying Ninja' ), true );
		assert.eventually.equal( shopPage.addProductToCart( 'Happy Ninja' ), true );

		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		assert.eventually.equal( cartPage.hasItem( 'Flying Ninja' ), true );
		return assert.eventually.equal( cartPage.hasItem( 'Happy Ninja' ), true );
	} );

	test.it( 'Should increases item qty when "Add to cart" of the same product is clicked', () => {
		const shopPage = new ShopPage( driver, { url: manager.getPageUrl( '/shop' ) } );
		assert.eventually.equal( shopPage.addProductToCart( 'Flying Ninja' ), true );

		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		assert.eventually.equal( cartPage.hasItem( 'Flying Ninja', { qty: 2 } ), true );
		return assert.eventually.equal( cartPage.hasItem( 'Happy Ninja', { qty: 1 } ), true );
	} );

	test.it( 'Should updates qty when updated via qty input', () => {
		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		cartPage.getItem( 'Flying Ninja', { qty: 2 } ).setQty( 4 );
		cartPage.update();
		cartPage.getItem( 'Happy Ninja', { qty: 1 } ).setQty( 3 );
		cartPage.update();

		assert.eventually.equal( cartPage.hasItem( 'Flying Ninja', { qty: 4 } ), true );
		return assert.eventually.equal( cartPage.hasItem( 'Happy Ninja', { qty: 3 } ), true );
	} );

	test.it( 'Should remove the item from the cart when remove is clicked', () => {
		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		cartPage.getItem( 'Flying Ninja', { qty: 4 } ).remove();
		cartPage.getItem( 'Happy Ninja', { qty: 3 } ).remove();

		return assert.eventually.equal( cartPage.hasNoItem(), true );
	} );
} );

test.after( 'Quit browser', () => {
	manager.quitBrowser();
} );
