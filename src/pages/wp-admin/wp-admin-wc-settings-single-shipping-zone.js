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

const ZONE_NAME_SELECTOR = By.css( '#zone_name' );
const ZONE_REGION_SELECTOR = By.css( '.select2-selection--multiple' );
const LIMIT_TO_SPECIFIC_ZIP_CODES_TOGGLE_SELECTOR = By.css( '.wc-shipping-zone-postcodes-toggle' );
const LIMIT_TO_SPECIFIC_ZIP_CODES_INPUT_SELECTOR = By.css( '#zone_postcodes' );
const ADD_SHIPPING_METHOD_SELECTOR = By.css( '.wc-shipping-zone-add-method' );
const SAVE_SELECTOR = By.css( '.wc-shipping-zone-method-save' );

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

	setZoneName( value ) {
		return helper.setWhenSettable( this.driver, ZONE_NAME_SELECTOR, value );
	}

	addZoneRegion( keyword, option ) {
		helper.mouseMoveTo( this.driver, ZONE_REGION_SELECTOR );
		return wcHelper.setSelect2WithSearch( this.driver, ZONE_REGION_SELECTOR, keyword, option );
	}

	removeZoneRegion( option ) {
		const selector = By.xpath(
			`//li[contains(@class,"select2-selection__choice") and contains(.,"${ option }")]` +
			'/span[contains(@class,"select2-selection__choice__remove")]'
		);

		return wcHelper.clickIfClickable( this.driver, selector );
	}

	openLimitToSpecificZipCodes() {
		return wcHelper.clickIfClickable( this.driver, LIMIT_TO_SPECIFIC_ZIP_CODES_TOGGLE_SELECTOR );
	}

	//setLimitToSpecificZipCodes

	//addShippingMethod

	//editShippingMethod

	//deleteShippingMethod

	//toggleShippingMethod
}
