/**
 * @module WPAdminWCSettingsProductsDownloadable
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

const FILE_DOWNLOAD_METHOD_SELECTOR = By.xpath( '//span[@id="select2-woocommerce_file_download_method-container"]/following-sibling::span[contains(@class, "select2-selection__arrow")]' );
const DOWNLOAD_REQUIRE_LOGIN_SELECTOR = By.css( '#woocommerce_downloads_require_login' );
const GRANT_ACCESS_AFTER_PAYMENT_SELECTOR = By.css( '#woocommerce_downloads_grant_access_after_payment' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * The Products: Downloadable Products settings screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsProductsDownloadable extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Select the file download method.
	*
 	* @param  {string}    option - File download text.
 	* @return {Promise}   Promise that evaluates to `true` if file download method selected successfully, `false` otherwise.
	*/
	selectFileDownloadMethod( option ) {
		return wcHelper.select2Option( this.driver, FILE_DOWNLOAD_METHOD_SELECTOR, option );
	}

	/**
	* Check the "Downloads require login" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkDownloadsRequireLogin() {
		helper.unsetCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
		return helper.setCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
	}

	/**
	* Uncheck the "Downloads require login" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckDownloadsRequireLogin() {
		helper.setCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
		return helper.unsetCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
	}

	/**
	* Check the "Grant access to downloadable products after payment" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkGrantAccessAfterPayment() {
		helper.unsetCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
		return helper.setCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
	}

	/**
	* Uncheck the "Grant access to downloadable products after payment" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unhecked successfully, `false` otherwise.
	*/
	uncheckGrantAccessAfterPayment() {
		helper.setCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
		return helper.unsetCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
	}
}
