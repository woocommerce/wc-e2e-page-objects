/**
 * @module SingleProductPage
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Page } from 'wp-e2e-page-objects';

const ADD_TO_CART_BUTTON_SELECTOR = By.css( 'button.single_add_to_cart_button' );
const QUANTITY_SELECTOR = By.css( 'input[name="quantity"]' );

const defaultArgs = {
	visit: true,
};

/**
 * The front-end Single Product page.
 *
 * @extends Page
 */
export default class SingleProductPage extends Page {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Click the "Add to cart" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button is found and clicked, `false` otherwise.
	*/
	addToCart() {
		return helper.clickWhenClickable( this.driver, ADD_TO_CART_BUTTON_SELECTOR );
	}

	/**
	* Set the quantity field.
	*
 	* @param {integer}   quantity - Amount to set to
 	* @return {void}
	*/
	setQuantity( quantity ) {
		const el = this.driver.findElement( QUANTITY_SELECTOR );

		helper.waitForFieldClearable( this.driver, QUANTITY_SELECTOR );
		el.sendKeys( quantity );
	}

	/**
	* Click a product.
	*
 	* @param  {string}    attribute - The attribute to set for (e.g. 'Color').
 	* @param  {string}    variation - The value to set for the attribute (e.g. 'Black').
 	* @return {Promise}   Promise that evaluates to `true` if variation found and set, `false` otherwise.
	*/
	selectVariation( attribute, variation ) {
		const selector = this._getVariationDropdownSelector( attribute );
		return helper.selectOption( this.driver, selector, variation );
	}

	/**
	* Get the xpath selector for selecting variations. (Internal use only)
	*
 	* @param  {string}    attribute - The attribute to set for (e.g. 'Color').
 	* @return {selector}
	*/
	_getVariationDropdownSelector( attribute ) {
		return By.xpath( '//label[contains(text(), "' + attribute + '")]/parent::*/parent::*//select' );
	}
}
