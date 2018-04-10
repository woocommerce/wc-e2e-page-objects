/**
 * @module WPAdminCouponEdit
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMetaBoxCouponData from '../../components/wp-admin/component-meta-box-coupon-data';

const DESCRIPTION_SELECTOR = By.css( '#woocommerce-coupon-description' );

/**
 * The admin Edit Coupon page
 *
 * @extends WPAdminPostEdit
 */
export default class WPAdminCouponEdit extends WPAdminPostEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxCouponData: ComponentMetaBoxCouponData,
				},
			},
			args
		);
		super( driver, args );
	}

	/**
	* Set the coupon description.
	*
 	* @param  {string}    description  - Text to enter in the description field.
 	* @return {Promise}   Promise that evaluates to `true` if description set successfully, `false` otherwise.
	*/
	setDescription( description ) {
		return helper.setWhenSettable( this.driver, DESCRIPTION_SELECTOR, description );
	}
}
