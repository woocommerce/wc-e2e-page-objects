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

export default class WPAdminWCSettingsTax extends WPAdminWCSettings {

	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Set the "Prices entered with tax" option to "Yes"
	* @return {Promise}
	*/
	selectPricesEnteredWithTax() {
		const selector = this._getPriceEnteredWithTaxSelector( 'yes' );
		return helper.clickWhenClickable( this.driver, selector );
	}

	/**
	* Set the "Prices entered with tax" option to "No"
	* @return {Promise}
	*/
	selectPricesEnteredWithNoTax() {
		const selector = this._getPriceEnteredWithTaxSelector( 'no' );
		return helper.clickWhenClickable( this.driver, selector );
	}

	_getPriceEnteredWithTaxSelector( option ) {
		return By.css( `input[name="woocommerce_prices_include_tax"][value="${ option }"]` );
	}

	selectCalculateTaxBasedOn( option ) {
		return wcHelper.select2Option( this.driver, CALCULATE_TAX_BASED_ON_SELECTOR, option );
	}

	selectShippingTaxClass( option ) {
		return wcHelper.select2Option( this.driver, SHIPPING_TAX_CLASS_SELECTOR, option );
	}

	checkRounding() {
		helper.unsetCheckbox( this.driver, ROUNDING_SELECTOR );
		return helper.setCheckbox( this.driver, ROUNDING_SELECTOR );
	}

	uncheckRounding() {
		helper.setCheckbox( this.driver, ROUNDING_SELECTOR );
		return helper.unsetCheckbox( this.driver, ROUNDING_SELECTOR );
	}

	removeAdditionalTaxClasses() {
		helper.setWhenSettable( this.driver, ADDITIONAL_TAX_CLASSES_SELECTOR, "" );
	}

	addAdditionalTaxClass( value ) {
		const driver = this.driver;

		return this.driver.findElement( ADDITIONAL_TAX_CLASSES_SELECTOR ).then(
			function( element ) {
				return element.getAttribute( 'value' ).then( ( el_value ) => {
					return helper.setWhenSettable( driver, ADDITIONAL_TAX_CLASSES_SELECTOR, ( el_value + '\n' + value ).trim() );
				} );
			},
			function() {
				return false;
			}
		);
	}

	removeAdditionalTaxClass( value ) {
		const driver = this.driver;

		return this.driver.findElement( ADDITIONAL_TAX_CLASSES_SELECTOR ).then(
			function( element ) {
				return element.getAttribute( 'value' ).then( ( el_value ) => {
					return helper.setWhenSettable( driver, ADDITIONAL_TAX_CLASSES_SELECTOR, el_value.replace( new RegExp( `${value}\n?` ), '' ) );
				} );
			},
			function() {
				return false;
			}
		);
	}

	selectDisplayPricesInTheShop( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_PRICES_IN_THE_SHOP_SELECTOR, option );

	}

	selectDisplayPricesDuringCartAndCheckout( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_PRICES_DURING_CART_CHECKOUT_SELECTOR, option );

	}

	setPriceDisplaySuffix( value ) {
		return helper.setWhenSettable( this.driver, PRICE_DISPLAY_SUFFIX_SELECTOR, value );
	}

	selectDisplayTaxTotals( option ) {
		return wcHelper.select2Option( this.driver, DISPLAY_TAX_TOTALS_SELECTOR, option );
	}
}
