/**
 * @module WPAdminWCSettingsCheckoutCOD
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

const ENABLE_SELECTOR = By.css( '#woocommerce_cod_enabled' );

/**
 * The admin Checkout: Cash on Delivery screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsCheckoutCOD extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Check box that enables this gateway.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkEnable() {
		return helper.setCheckbox( this.driver, ENABLE_SELECTOR );
	}

	/**
	* Uncheck box that enables this gateway.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckEnable() {
		return helper.unsetCheckbox( this.driver, ENABLE_SELECTOR );
	}
}
