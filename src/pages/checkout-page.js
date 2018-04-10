/**
 * @module CheckoutPage
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
import ComponentCheckoutBillingDetails from '../components/component-checkout-billing-details';
import ComponentCheckoutShippingDetails from '../components/component-checkout-shipping-details';
import ComponentCheckoutOrderReview from '../components/component-checkout-order-review';

const defaultArgs = {
	components: {
		billingDetails: ComponentCheckoutBillingDetails,
		shippingDetails: ComponentCheckoutShippingDetails,
		orderReview: ComponentCheckoutOrderReview,
	},
};

const ORDER_NOTES_SELECTOR = By.css( '#order_comments' );
const SHIP_TO_DIFFERENT_ADDRESS_SELECTOR = By.css( '#ship-to-different-address-checkbox' );
const PLACE_ORDER_SELECTOR = By.css( '#place_order' );

/**
 * The front-end Checkout page.
 *
 * @extends Page
 */
export default class CheckoutPage extends Page {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Set order notes for the order.
	*
 	* @param  {string}    notes - Text to put in the order notes box.
 	* @return {Promise}   Promise that evaluates to `true` if order notes are entered successfully, `false` otherwise.
	*/
	setOrderNotes( notes ) {
		return helper.setWhenSettable( this.driver, ORDER_NOTES_SELECTOR, notes );
	}

	/**
	* Check the "Ship to a different address?" box.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked, `false` otherwise.
	*/
	checkShipToDifferentAddress() {
		helper.mouseMoveTo( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
		return helper.setCheckbox( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
	}

	/**
	* Uncheck the "Ship to a different address?" box.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked, `false` otherwise.
	*/
	uncheckShipToDifferentAddress() {
		helper.mouseMoveTo( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
		return helper.unsetCheckbox( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
	}

	/**
	* Select a payment method.
	*
 	* @param  {string}    name - Text name of the payment method.
 	* @return {Promise}   Promise that evaluates to `true` if payment method is selected successfully, `false` otherwise.
	*/
	selectPaymentMethod( name ) {
		const selector = By.xpath( `//li[contains(@class, "wc_payment_method")]//label[contains(.,"${ name }")]` );
		return this.driver.actions().
			mouseMove( this.driver.findElement( selector ), { x: 0, y: 0 } ).
			click().
			perform().then( () => {
				return true;
			}, () => {
				return false;
			} );
	}

	/**
	* Click the "Place order" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button is clicked successfully, `false` otherwise.
	*/
	placeOrder() {
		return helper.clickWhenClickable( this.driver, PLACE_ORDER_SELECTOR );
	}
}
