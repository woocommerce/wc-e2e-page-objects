/**
 * @module WPAdminProducts
 */

/**
 * External dependencies
 */
import { WPAdminPosts } from 'wp-e2e-page-objects';

/**
 * The admin Products posts screen
 *
 * @extends WPAdminPosts
 */
export default class WPAdminProducts extends WPAdminPosts {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
