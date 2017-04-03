/**
 * @module WPAdminWCSettingsSingleShippingZone
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

/**
 * The settings screen for one shipping zone
 */
export default class WPAdminWCSettingsSingleShippingZone {

	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
	*/
	constructor( driver ) {
		this.driver = driver;
	}

	//setZoneName

	//addZoneRegion

	//removeZoneRegion

	//isOpenLimitToSpecificZipCodes

	//openLimitToSpecificZipCodes

	//setLimitToSpecificZipCodes

	//addShippingMethod

	//editShippingMethod

	//toggleShippingMethod
}
