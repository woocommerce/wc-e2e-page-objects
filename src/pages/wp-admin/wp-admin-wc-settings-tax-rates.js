/**
 * @module WPAdminWCSettingsTaxRates
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
/*
const CALCULATE_TAX_BASED_ON_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_based_on' );
const SHIPPING_TAX_CLASS_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_shipping_tax_class' );
const ROUNDING_SELECTOR = By.css( '#woocommerce_tax_round_at_subtotal' );
const ADDITIONAL_TAX_CLASSES_SELECTOR = By.css( '#woocommerce_tax_classes' );
const DISPLAY_PRICES_IN_THE_SHOP_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_display_shop' );
const DISPLAY_PRICES_DURING_CART_CHECKOUT_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_display_cart' );
const PRICE_DISPLAY_SUFFIX_SELECTOR = By.css( '#woocommerce_price_display_suffix' );
const DISPLAY_TAX_TOTALS_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_tax_total_display' );
*/
const INSERT_ROW_SELECTOR = By.css( '.button.insert' );
const REMOVE_SELECTED_ROWS_SELECTOR = By.css( '.button.remove_tax_rates' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * A Tax: Standard/other rates settings screen.
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsTaxRates extends WPAdminWCSettings {

	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	_getSelector( row, child_el = '' ) {
		return By.css( `#rates tr:nth-child(${ row }) ${ child_el }` );
	}

	setCountryCode( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.wc_input_country_iso' ), value );
	}

	setStateCode( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.state input' ), value );
	}

	setZipCode( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.postcode input' ), value );
	}

	setCity( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.city input' ), value );
	}

	setRate( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.rate input' ), value );
	}

	setTaxName( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.name input' ), value );
	}

	setPriority( row, value ) {
		return helper.setWhenSettable( this.driver, this._getSelector( row, '.priority input' ), value );
	}

	checkCompound( row ) {
		const selector = this._getSelector( row, '.compound input' );
		helper.unsetCheckbox( this.driver, selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckCompound( row ) {
		const selector = this._getSelector( row, '.compound input' );
		helper.setCheckbox( this.driver, selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	checkShipping( row ) {
		const selector = this._getSelector( row, '.apply_to_shipping input' );
		helper.unsetCheckbox( this.driver, selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckShipping( row ) {
		const selector = this._getSelector( row, '.apply_to_shipping input' );
		helper.setCheckbox( this.driver, selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	insertRow() {
		return helper.clickWhenClickable( this.driver, INSERT_ROW_SELECTOR );
	}

	removeSelectedRows() {
		return helper.clickWhenClickable( this.driver, REMOVE_SELECTED_ROWS_SELECTOR );
	}

	removeRow( row ) {
		var self = this;
		return helper.clickWhenClickable( this.driver, this._getSelector( row, '.wc_input_country_iso' ) ).then(
			function() {
				return self.removeSelectedRows();
			}
		);
	}

	//removeRow

}
