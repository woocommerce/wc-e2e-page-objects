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
const BASE_LOCATION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_default_country' );
const SELLING_LOCATION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_allowed_countries' );
const SELL_TO_SPECIFIC_COUNTRIES_SELECTOR = wcHelper.getSelect2ToggleSelectorByName(
	'woocommerce_specific_allowed_countries[]', { multiple: true }
);
const ENABLE_TAXES_SELECTOR = By.css( '#woocommerce_calc_taxes' );
const STORE_NOTICE_SELECTOR = By.css( '#woocommerce_demo_store' );
const CURRENCY_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_currency' );
const CURRENCY_POSITION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_currency_pos' );
const THOUSAND_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_thousand_sep' );
const DECIMAL_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_decimal_sep' );
const NUMBER_OF_DECIMALS_SELECTOR = By.css( '#woocommerce_price_num_decimals' );
*/

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
	* Set the "Prices entered with tax" option
	* @param {boolean} - true for yes, false for no
	* @return {Promise}
	*/
	selectPricesEnteredWithTax( yes ) {
		const value = yes ? 'yes' : 'no';
		const selector = By.css( `input[name="woocommerce_prices_include_tax"][value="${ value }"]` );
		return helper.clickWhenClickable( this.driver, selector );
	}

	selectCalculateTaxBasedOn( option ) {

	}

	selectShippingTaxClass( option ) {

	}

	checkRounding() {

	}

	uncheckRounding() {

	}

	removeAdditionalTaxClasses() {

	}

	addAdditionalTaxClass( option ) {

	}

	selectDisplayPricesInTheShop( option ) {

	}

	selectDisplayPricesDuringCartAndCheckout( option ) {

	}

	setPriceDisplaySuffix( option ) {

	}

	selectDisplayTaxTotals( option ) {

	}
}
