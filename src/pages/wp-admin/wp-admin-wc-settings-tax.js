/**
 * @module WPAdminWCSettingsTax
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import * as wcHelper from '../../helper';
import WPAdminWCSettings from './wp-admin-wc-settings';

const CALCULATE_TAX_BASED_ON_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_based_on' );
const SHIPPING_TAX_CLASS_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_shipping_tax_class' );
const ROUNDING_SELECTOR = By.css( '#woocommerce_tax_round_at_subtotal' );
const ADDITIONAL_TAX_CLASSES_SELECTOR = By.css( '#woocommerce_tax_classes' );
const DISPLAY_PRICES_IN_THE_SHOP_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_display_shop' );
const DISPLAY_PRICES_DURING_CART_CHECKOUT_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_display_cart' );
const PRICE_DISPLAY_SUFFIX_SELECTOR = By.css( '#woocommerce_price_display_suffix' );
const DISPLAY_TAX_TOTALS_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_total_display' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * The Tax: Tax Options settings screen.
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsTax extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Set the "Prices entered with tax" option to "Yes".
 	* @return {Promise}   Promise that evaluates to `true` if set selected successfully, `false` otherwise.
	*/
	selectPricesEnteredWithTax() {
		const selector = this._getPriceEnteredWithTaxSelector( 'yes' );
		return helper.clickWhenClickable( this.driver, selector );
	}

	/**
	* Set the "Prices entered with tax" option to "No".
 	* @return {Promise}   Promise that evaluates to `true` if set selected successfully, `false` otherwise.
	*/
	selectPricesEnteredWithNoTax() {
		const selector = this._getPriceEnteredWithTaxSelector( 'no' );
		return helper.clickWhenClickable( this.driver, selector );
	}

	/**
	* Select the weight unit.
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selected successfully, `false` otherwise.
	*/
	selectCalculateTaxBasedOn( option ) {
		return wcHelper.select2Option( this.driver, CALCULATE_TAX_BASED_ON_SELECTOR, option );
	}

	/**
	* Select the shipping tax class.
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selected successfully, `false` otherwise.
	*/
	selectShippingTaxClass( option ) {
		return wcHelper.select2Option( this.driver, SHIPPING_TAX_CLASS_SELECTOR, option );
	}

	/**
	* Check the "Rounding" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkRounding() {
		helper.unsetCheckbox( this.driver, ROUNDING_SELECTOR );
		return helper.setCheckbox( this.driver, ROUNDING_SELECTOR );
	}

	/**
	* Uncheck the "Rounding" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckRounding() {
		helper.setCheckbox( this.driver, ROUNDING_SELECTOR );
		return helper.unsetCheckbox( this.driver, ROUNDING_SELECTOR );
	}

	/**
	* Remove all of the additional tax classes from the additional tax class field.
	*
 	* @return {Promise}   Promise that evaluates to `true` if input found and set successfully, `false` otherwise.
	*/
	removeAdditionalTaxClasses() {
		return helper.setWhenSettable( this.driver, ADDITIONAL_TAX_CLASSES_SELECTOR, '' );
	}

	/**
	* Add an additional tax class to the additional tax class field.
	*
	* @param  {string}    value - Tax class to add
 	* @return {Promise}   Promise that evaluates to `true` if input found and class added successfully, `false` otherwise.
	*/
	addAdditionalTaxClass( value ) {
		const driver = this.driver;

		return this.driver.findElement( ADDITIONAL_TAX_CLASSES_SELECTOR ).then(
			function( element ) {
				return element.getAttribute( 'value' ).then( ( elValue ) => {
					return helper.setWhenSettable( driver, ADDITIONAL_TAX_CLASSES_SELECTOR, ( elValue + '\n' + value ).trim() );
				} );
			},
			function() {
				return false;
			}
		);
	}

	/**
	* Remove an additional tax class from the additional tax class field.
	*
	* @param  {string}    value - Tax class to remove
 	* @return {Promise}   Promise that evaluates to `true` if input found and class removed successfully, `false` otherwise.
	*/
	removeAdditionalTaxClass( value ) {
		const driver = this.driver;

		return this.driver.findElement( ADDITIONAL_TAX_CLASSES_SELECTOR ).then(
			function( element ) {
				return element.getAttribute( 'value' ).then( ( elValue ) => {
					return helper.setWhenSettable( driver, ADDITIONAL_TAX_CLASSES_SELECTOR, elValue.replace( new RegExp( `${ value }\n?` ), '' ) );
				} );
			},
			function() {
				return false;
			}
		);
	}

	/**
	* Select the "Display prices in the shop" option.
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selected successfully, `false` otherwise.
	*/
	selectDisplayPricesInTheShop( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_PRICES_IN_THE_SHOP_SELECTOR, option );
	}

	/**
	* Select the "Display prices during cart and checkout" option.
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selected successfully, `false` otherwise.
	*/
	selectDisplayPricesDuringCartAndCheckout( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_PRICES_DURING_CART_CHECKOUT_SELECTOR, option );
	}

	/**
	* Set the price display suffix field.
	*
 	* @param  {string}    value - Price display suffix.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setPriceDisplaySuffix( value ) {
		return helper.setWhenSettable( this.driver, PRICE_DISPLAY_SUFFIX_SELECTOR, value );
	}

	/**
	* Select the "Display tax totals" option.
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selected successfully, `false` otherwise.
	*/
	selectDisplayTaxTotals( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_TAX_TOTALS_SELECTOR, option );
	}

	/**
	* Get a selector for a "Prices entered with tax" radio option. (Internal use only)
	*
 	* @param  {string}    option - Text for option to select.
 	* @return {object}    Selector.
	*/
	_getPriceEnteredWithTaxSelector( option ) {
		return By.css( `input[name="woocommerce_prices_include_tax"][value="${ option }"]` );
	}
}
