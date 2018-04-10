/**
 * @module WPAdminOrders
 */

/**
 * External dependencies
 */
import { WPAdminPosts } from 'wp-e2e-page-objects';

/**
 * The admin Orders posts page
 *
 * @extends WPAdminPosts
 */
export default class WPAdminOrders extends WPAdminPosts {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
