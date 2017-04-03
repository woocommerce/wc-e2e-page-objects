/**
 * @module WPAdminWCSettingsShippingZones
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

/**
 * The General admin settings screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsShippingZones extends WPAdminWCSettings {

	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

}
