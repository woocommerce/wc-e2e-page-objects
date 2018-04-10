/**
 * @module WPAdminOrderNew
 */

/**
 * Internal dependencies
 */
import WPAdminOrderEdit from './wp-admin-order-edit';

/**
 * The admin Add New Order page
 *
 * @extends WPAdminOrderEdit
 */
export default class WPAdminOrderNew extends WPAdminOrderEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
