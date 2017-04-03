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

const ADD_SHIPPING_ZONE_SELECTOR = By.css( '.wc-shipping-zones-heading .page-title-action' );

const defaultArgs = {
	url: '',
	visit: true
};

/**
 * The main Shipping Zones settings page
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

	/**
	 * Click the "Add Shipping Zone" button
	 *
	 * return {Promise} Promise that evaluates to `true` if clicked successfully, `false` otherwise.
	 */
	addShippingZone() {
		return helper.clickWhenClickable( this.driver, ADD_SHIPPING_ZONE_SELECTOR );
	}

	/**
	 * Click on a shipping zone to edit it.
	 *
	 * @param  {string}   Name of shipping zone to edit.
	 * @return {Promise}  Promise that evaluates to `true` if zone found and clicked successfully, `false` otherwise.
	 */
	editShippingZone( zone ) {
		const selector = By.xpath( `//td[contains(@class, "wc-shipping-zone-name")]/a[contains(text(), "${ zone }")]` );
		return helper.clickWhenClickable( this.driver, selector );
	}

	/**
	 * Click on the "Delete" link on a shipping zone.
	 *
	 * @param  {string}   Name of shipping zone to delete.
	 * @return {Promise}  Promise that evaluates to `true` if zone found and deleted successfully, `false` otherwise.
	 */
	deleteShippingZone( zone ) {
		const container_selector = By.xpath( `//td[contains(@class, "wc-shipping-zone-name")]/a[contains(text(), "${ zone }")]` );
		const delete_selector = By.xpath( `//td[contains(@class, "wc-shipping-zone-name")]/a[contains(text(), "${ zone }")]/..//a[contains(@class, "wc-shipping-zone-delete")]` );

		helper.mouseMoveTo( this.driver, container_selector );
		return helper.clickWhenClickable( this.driver, delete_selector ).then(
			() => { return wcHelper.waitTillAlertAccepted( this.driver ); },
			() => { return false; }
		);
	}
}
