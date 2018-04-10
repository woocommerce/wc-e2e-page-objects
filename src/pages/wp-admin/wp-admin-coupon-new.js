/**
 * @module WPAdminCouponNew
 */

/**
 * Internal dependencies
 */
import WPAdminCouponEdit from './wp-admin-coupon-edit';

/**
 * The admin Add New Coupon page
 *
 * @extends WPAdminCouponEdit
 */
export default class WPAdminCouponNew extends WPAdminCouponEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
