In this section we are going to write a test suite that creates a product and publishes it.

- In order to work with the New Product screen we're going to need a [WPAdminProductNew](module-WPAdminProductEdit.html) object, which extends [WPAdminProductEdit](module-WPAdminProductEdit.html). WPAdminProductEdit extends [WPAdminPostEdit](https://github.com/woocommerce/wp-e2e-page-objects/blob/master/src/pages/wp-admin/wp-admin-post-edit.js) from wp-e2e-page-objects.

- Create a file called `admin-tests.js` in your tests folder.

- Put the following into `admin-tests.js`:

```javascript
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';

// Helper objects for performing actions.
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';

// We're going to use the WPLogin object from wp-e2e-page-objects and WPAdminProduct new for this.
import { WPLogin } from 'wp-e2e-page-objects';
import { WPAdminProductNew } from 'wc-e2e-page-objects';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.describe( 'Admin Tests', function() {

	// Set up the driver and manager before testing starts.
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// Log into the dashboard before testing starts.
	test.before( 'login', () => {
		const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
		wpLogin.login( config.get( 'users.admin.username' ), config.get( 'users.admin.password' ) );
	} );

	// Tests will go here.

	// Close the browser after finished testing.
	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );

} );
```
If you recall the [front-end tests tutorial](tutorial-first-test.html), this boilerplate looks pretty much just like the standard boilerplate, but it also logs into the dashboard before testing starts.

- Add a test in between `test.before()` and `test.after()`:

```javascript
test.it( 'can create simple virtual product titled "Tutorial Product" with regular price $9.99', () => {

	// Create a New Product page object.
	const product = new WPAdminProductNew( driver, { url: manager.getPageUrl( '/wp-admin/post-new.php?post_type=product' ) } );

	// Set the product's title.
	product.setTitle( 'Tutorial Product' );

	// The object for the Product Data metabox. Metabox objects are in the components field of page objects.
	const productData = product.components.metaBoxProductData;

	// Select the product type.
	productData.selectProductType( 'Simple product' );

	// Check the "Virtual" checkbox.
	productData.checkVirtual();

	// Click the "General" tab of the metabox. This returns an object for that tab of the metabox.
	const panelGeneral = productData.clickTab( 'General' );

	// Set the regular price in the general tab.
	panelGeneral.setRegularPrice( '9.99' );

	// Publish the product.
	product.publish();

	// Check for the "Product published" notice.
	const publish_notice_exists = product.hasNotice( 'Product published.' );

	// Verify the notice was displayed.
	assert.eventually.ok( publish_notice_exists );

} );
```

- `npm run test` to run the test suite.

- You should get some success output like:

```
  Admin Tests
    ✓ can create simple virtual product titled "Tutorial Product" with regular price $9.99 (6087ms)
  
  1 passing (10s)
```

- Using this methodology, you can write tests for any action a store owner could perform on a WooCommerce site and verify those actions will be successful, without having to manually go and try it yourself to make sure everything is working OK.

## Tutorial completed!
