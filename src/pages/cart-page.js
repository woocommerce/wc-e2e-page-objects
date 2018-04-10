/**
 * @module CartPage
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentCartTotals from '../components/component-cart-totals';
import ComponentCartItem from '../components/component-cart-item';
import CheckoutPage from './checkout-page';

const CART_EMPTY_SELECTOR = By.css( '.cart-empty' );
const RETURN_TO_SHOP_SELECTOR = By.css( '.return-to-shop' );
const UPDATE_CART_SELECTOR = By.css( '[name="update_cart"]' );
const PROCEED_TO_CHECKOUT_SELECTOR = By.css( '.checkout-button' );

const defaultArgs = {
	components: {
		cartTotals: ComponentCartTotals,
	},
};

/**
 * The front-end Cart page.
 *
 * @extends Page
 */
export default class CartPage extends Page {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Click the "Return to Shop" link.
	*
 	* @return {Promise}   Promise that evaluates to `true` if link is clicked successfully, `false` otherwise.
	*/
	returnToShop() {
		return helper.clickWhenClickable(
			this.driver,
			RETURN_TO_SHOP_SELECTOR
		);
	}

	/**
	* Check whether the cart is empty.
	*
 	* @return {Promise}   Promise that evaluates to `true` if cart is empty, `false` otherwise.
	*/
	hasNoItem() {
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			CART_EMPTY_SELECTOR
		);
	}

	/**
	* Check whether a specific item is in the cart.
	*
 	* @param  {string}    productTitle - The product title to look for.
  	* @param  {object}    args         - Config options. Default { qty: 1 }.
 	* @return {Promise}   Promise that evaluates to `true` if item is displayed in the cart, `false` otherwise.
	*/
	hasItem( productTitle, args = { qty: 1 } ) {
		const item = new ComponentCartItem( this.driver, productTitle, args );
		return item.displayed();
	}

	/**
	* Get the ComponentCartItem object for a product.
	*
 	* @param  {string}    productTitle - The title of the product to associate with the object.
  	* @param  {object}    args         - Config options. Default { qty: 1 }.
 	* @return {ComponentCartItem}      ComponentCartItem.
	*/
	getItem( productTitle, args = { qty: 1 } ) {
		return new ComponentCartItem( this.driver, productTitle, args );
	}

	/**
	* Click the "Update cart" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button successfully clicked, `false` otherwise.
	*/
	update() {
		helper.clickWhenClickable(
			this.driver,
			UPDATE_CART_SELECTOR
		);

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( '//div[@class="woocommerce-message" and contains(text(), "Cart updated")]' )
		);
	}

	/**
	* Check whether the cart has a certain subtotal.
	*
 	* @param  {string}    subtotal     - The amount to look for.
 	* @return {Promise}   Promise that evaluates to `true` if the subtotal is present, `false` otherwise.
	*/
	hasSubtotal( subtotal ) {
		return this.components.cartTotals.hasSubtotal( subtotal );
	}

	/**
	* Click the "Proceed to checkout" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button successfully clicked, `false` otherwise.
	*/
	checkout() {
		helper.clickWhenClickable( this.driver, PROCEED_TO_CHECKOUT_SELECTOR );

		return new CheckoutPage( this.driver, { visit: false } );
	}
}
