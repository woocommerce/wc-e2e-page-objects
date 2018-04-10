/**
 * @module WPAdminCoupons
 */

/**
 * External dependencies
 */
import { WPAdminPosts } from 'wp-e2e-page-objects';

/**
 * The admin Coupons post page
 *
 * @extends WPAdminPosts
 */
export default class WPAdminCoupons extends WPAdminPosts {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
