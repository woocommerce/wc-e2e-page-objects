/**
 * @module WPAdminWCSettingsProductsInventory
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

const STOCK_MANAGEMENT_SELECTOR = By.css( '#woocommerce_manage_stock' );
const HOLD_STOCK_MINUTES_SELECTOR = By.css( '#woocommerce_hold_stock_minutes' );
const LOW_STOCK_NOTIFICATIONS_SELECTOR = By.css( '#woocommerce_notify_low_stock' );
const OUT_OF_STOCK_NOTIFICATIONS_SELECTOR = By.css( '#woocommerce_notify_no_stock' );
const NOTIFICATION_RECIPIENTS_SELECTOR = By.css( '#woocommerce_stock_email_recipient' );
const LOW_STOCK_THRESHOLD_SELECTOR = By.css( '#woocommerce_notify_low_stock_amount' );
const OUT_OF_STOCK_THRESHOLD_SELECTOR = By.css( '#woocommerce_notify_no_stock_amount' );
const OUT_OF_STOCK_VISIBILITY_SELECTOR = By.css( '#woocommerce_hide_out_of_stock_items' );
const STOCK_DISPLAY_FORMAT_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_stock_format' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * The Products: Inventory settings screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsProductsInventory extends WPAdminWCSettings {
	/**
	 * @param {WebDriver} driver   - Instance of WebDriver.
	 * @param {object}    args     - Configuration arguments.
	 */
	constructor(driver, args = {}) {
		args = Object.assign(defaultArgs, args);
		super(driver, args);
	}

	/**
	 * Check the "Enable stock management" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableStockManagement() {
		helper.unsetCheckbox( this.driver, STOCK_MANAGEMENT_SELECTOR );
		return helper.setCheckbox( this.driver, STOCK_MANAGEMENT_SELECTOR );
	}

	/**
	 * Uncheck the "Enable stock management" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableStockManagement() {
		helper.setCheckbox( this.driver, STOCK_MANAGEMENT_SELECTOR );
		return helper.unsetCheckbox( this.driver, STOCK_MANAGEMENT_SELECTOR );
	}

	/**
	 * Set the hold stock (minutes) input.
	 *
	 * @param  {number}    num          - Number of minutes.
	 * @return {Promise}   Promise that evaluates to `true` if number of minutes set successfully, `false` otherwise.
	 */
	setHoldStockMinutes( num ) {
		return helper.setWhenSettable( this.driver, HOLD_STOCK_MINUTES_SELECTOR, num );
	}

	/**
	 * Check the "Enable low stock notifications" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableLowStockNotifications() {
		helper.unsetCheckbox( this.driver, LOW_STOCK_NOTIFICATIONS_SELECTOR );
		return helper.setCheckbox( this.driver, LOW_STOCK_NOTIFICATIONS_SELECTOR );
	}

	/**
	 * Uncheck the "Enable low stock notifications" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableLowStockNotifications() {
		helper.setCheckbox( this.driver, LOW_STOCK_NOTIFICATIONS_SELECTOR );
		return helper.unsetCheckbox( this.driver, LOW_STOCK_NOTIFICATIONS_SELECTOR );
	}

	/**
	 * Check the "Enable out of stock notifications" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableOutOfStockNotifications() {
		helper.unsetCheckbox( this.driver, OUT_OF_STOCK_NOTIFICATIONS_SELECTOR );
		return helper.setCheckbox( this.driver, OUT_OF_STOCK_NOTIFICATIONS_SELECTOR );
	}

	/**
	 * Uncheck the "Enable out of stock notifications" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableOutOfStockNotifications() {
		helper.setCheckbox( this.driver, OUT_OF_STOCK_NOTIFICATIONS_SELECTOR );
		return helper.unsetCheckbox( this.driver, OUT_OF_STOCK_NOTIFICATIONS_SELECTOR );
	}

	/**
	 * Set the notification recipient(s) input.
	 *
	 * @param  {string}    email    - Notification recipient(s) email.
	 * @return {Promise}   Promise that evaluates to `true` if email set successfully, `false` otherwise.
	 */
	setNotificationRecipients( email ) {
		return helper.setWhenSettable( this.driver, NOTIFICATION_RECIPIENTS_SELECTOR, email );
	}

	/**
	 * Set the low stock threshold input.
	 *
	 * @param  {number}    num          - Number of items.
	 * @return {Promise}   Promise that evaluates to `true` if number of items set successfully, `false` otherwise.
	 */
	setLowStockThreshold( num ) {
		return helper.setWhenSettable( this.driver, LOW_STOCK_THRESHOLD_SELECTOR, num );
	}

	/**
	 * Set the out of stock threshold input.
	 *
	 * @param  {number}    num          - Number of items.
	 * @return {Promise}   Promise that evaluates to `true` if number of items set successfully, `false` otherwise.
	 */
	setOutOfStockThreshold( num ) {
		return helper.setWhenSettable( this.driver, OUT_OF_STOCK_THRESHOLD_SELECTOR, num );
	}

	/**
	 * Check the "Hide out of stock items from the catalog" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableHideOutOfStockItemsFromTheCatalog() {
		helper.unsetCheckbox( this.driver, OUT_OF_STOCK_VISIBILITY_SELECTOR );
		return helper.setCheckbox( this.driver, OUT_OF_STOCK_VISIBILITY_SELECTOR );
	}

	/**
	 * Uncheck the "Hide out of stock items from the catalog" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableHideOutOfStockItemsFromTheCatalog() {
		helper.setCheckbox( this.driver, OUT_OF_STOCK_VISIBILITY_SELECTOR );
		return helper.unsetCheckbox( this.driver, OUT_OF_STOCK_VISIBILITY_SELECTOR );
	}

	/**
	 * Select the stock display format.
	 *
	 * @param  {string}    option - stock display format text.
	 * @return {Promise}   Promise that evaluates to `true` if stock display format selected successfully, `false` otherwise.
	 */
	selectStockDisplayFormat( option ) {
		return wcHelper.select2Option( this.driver, STOCK_DISPLAY_FORMAT_SELECTOR, option );
	}
}
