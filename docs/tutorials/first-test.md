In this section we are going to write a test suite that adds a product to the Cart from the Shop page, navigates to the Cart, and verifies the product is present in the Cart.

- In order to go to the Shop page and add some items, we're going to need a [ShopPage](module-ShopPage.html) object. In order to go to the Cart page and check the items, we're going to need a [CartPage](module-CartPage.html) object.

- Create a file called `frontend-tests.js` in your tests folder.

- Put the following into `frontend-tests.js`:

```javascript
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';

// Helper objects for performing actions.
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';

// We're going to use the ShopPage and CartPage objects for this tutorial.
import { ShopPage, CartPage } from 'wc-e2e-page-objects';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'Frontend Tests', function() {

	// Set up the driver and manager before testing starts.
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// Tests will go here.

	// Close the browser after finished testing.
	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );

} );
```

This is the standard boilerplate for writing a test suite. Feel free to copy + paste this template for your test suites. You only have to change the components you are importing from `wc-e2e-page-objects` to import the actual ones you're going to need.

- Give everything a test run with `npm run test`. If everything is working correctly, you should see a success message like `0 passing (2ms)` in your terminal. If you get a bunch of `npm ERR!` instead, please go back and make sure you have all of the necessary files in your environment.

- Add a test in between `this.timeout()` and `test.after()`:

```javascript
test.it( 'Adds the product to the cart when "Add to cart" is clicked', () => {

	// Create a new Shop page object. 
	const shopPage = new ShopPage( driver, { url: manager.getPageUrl( '/shop' ) } );

	// Add a couple products to the cart.
	// If you're not using the WooCommerce dummy data, use any simple products on your shop's first page.
	const added_flying = shopPage.addProductToCart( 'Flying Ninja' );
	const added_happy = shopPage.addProductToCart( 'Happy Ninja' );

	// Verify products were added to cart successfully.
	// Page action methods return promises that evaluate to true if the action is performed successfully.
	assert.eventually.ok( added_flying );
	assert.eventually.ok( added_happy );

	// Create a new Cart page object.
	const cartPage = new CartPage( driver, { url: manager.getPageUrl( '/cart' ) } );

	// Check the cart for the items added earlier.
	const has_flying = cartPage.hasItem( 'Flying Ninja' );
	const has_happy = cartPage.hasItem( 'Happy Ninja' );

	// Verify the cart has the items.
	assert.eventually.ok( has_flying );
	assert.eventually.ok( has_happy );

} );
```

- `npm run test` to run the test suite.

- You should get some success output like:

```
  Frontend Tests
    ✓ Adds the product to the cart when "Add to cart" is clicked (2577ms)

  1 passing (5s)
```

- Using this methodology, you can write tests for any action a customer could perform on a WooCommerce site and verify those actions will be successful, without having to manually go and try it yourself to make sure everything is working OK.

Ready to move on?

## [Writing admin screen tests.](tutorial-admin-test.html)

