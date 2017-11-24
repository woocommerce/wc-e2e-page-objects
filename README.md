wc-e2e-page-objects
===================

[![npm version](https://img.shields.io/npm/v/wc-e2e-page-objects.svg?style=flat)](https://www.npmjs.com/package/wc-e2e-page-objects)
[![build status](https://api.travis-ci.org/woocommerce/wc-e2e-page-objects.svg)](http://travis-ci.org/woocommerce/wc-e2e-page-objects)
[![dependency status](https://david-dm.org/woocommerce/wc-e2e-page-objects.svg)](https://david-dm.org/woocommerce/wc-e2e-page-objects)

WooCommerce Page Objects to be used on end-to-end tests with Selenium WebDriver.

## Install

```
npm install wc-page-objects
```

## Docs
- [Setting up WooCommerce Core e2e tests](https://github.com/woocommerce/woocommerce/wiki/End-to-end-Testing)
- [API](https://woocommerce.github.io/wc-e2e-page-objects/wc-e2e-page-objects/0.3.0/index.html)
- [Tutorial](https://woocommerce.github.io/wc-e2e-page-objects/wc-e2e-page-objects/0.3.0/tutorial-overview.html)
- [Contributing](./.github/CONTRIBUTING.md)

## Usage

Example:
~~~js
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ShopPage, CartPage } from 'wc-e2e-page-objects';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'Cart page', function() {
	test.before( 'open browser', function() {
		manager = new WebDriverManager( 'chrome', { baseUrl: 'http://local.wordpress.dev' } );
		driver = manager.getDriver();
		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	test.it( 'should displays no item in the cart', () => {
		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		assert.eventually.equal( cartPage.hasNoItem(), true );
	} );

	test.it( 'should adds the product to the cart when "Add to cart" is clicked', () => {
		const shopPage = new ShopPage( driver, { url: manager.getPageUrl( '/shop' ) } );
		assert.eventually.equal( shopPage.addProductToCart( 'Flying Ninja' ), true );
		assert.eventually.equal( shopPage.addProductToCart( 'Happy Ninja' ), true );

		const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );
		assert.eventually.equal( cartPage.hasItem( 'Flying Ninja' ), true );
		assert.eventually.equal( cartPage.hasItem( 'Happy Ninja' ), true );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );
~~~
