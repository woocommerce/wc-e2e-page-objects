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

export default class WPAdminWCSettingsProductsDownloadable extends WPAdminWCSettings {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	selectFileDownloadMethod( option ) {
		return wcHelper.select2Option( this.driver, FILE_DOWNLOAD_METHOD_SELECTOR, option );
	}

	checkDownloadsRequireLogin() {
		helper.unsetCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
		return helper.setCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
	}

	uncheckDownloadsRequireLogin() {
		helper.setCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
		return helper.unsetCheckbox( this.driver, DOWNLOAD_REQUIRE_LOGIN_SELECTOR );
	}

	checkGrantAccessAfterPayment() {
		helper.unsetCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
		return helper.setCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
	}

	uncheckGrantAccessAfterPayment() {
		helper.setCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
		return helper.unsetCheckbox( this.driver, GRANT_ACCESS_AFTER_PAYMENT_SELECTOR );
	}
}
