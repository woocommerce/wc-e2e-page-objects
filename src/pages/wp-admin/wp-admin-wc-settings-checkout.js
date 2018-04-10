/**
 * @module WPAdminWCSettingsCheckout
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import WPAdminWCSettings from './wp-admin-wc-settings';

const defaultArgs = {
	url: '',
	visit: true,
};

const ENABLE_COUPONS_SELECTOR = By.css( '#woocommerce_enable_coupons' );
const CALC_DISCOUNTS_SEQUENTIALLY = By.css( '#calc_discounts_sequentially' );

/**
 * The admin Checkout: Checkout Options screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsCheckout extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Check the "Enable the use of coupons" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkEnableCoupons() {
		return helper.setCheckbox( this.driver, ENABLE_COUPONS_SELECTOR );
	}

	/**
	* Uncheck the "Enable the use of coupons" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckEnableCoupons() {
		return helper.unsetCheckbox( this.driver, ENABLE_COUPONS_SELECTOR );
	}

	/**
	* Check the "Calculate coupon discounts sequentially" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkCalculateDiscountsSequentially() {
		return helper.setCheckbox( this.driver, CALC_DISCOUNTS_SEQUENTIALLY );
	}

	/**
	* Uncheck the "Calculate coupon discounts sequentially" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckCalculateDiscountsSequentially() {
		return helper.unsetCheckbox( this.driver, CALC_DISCOUNTS_SEQUENTIALLY );
	}
}
