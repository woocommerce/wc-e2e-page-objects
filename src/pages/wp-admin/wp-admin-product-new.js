/**
 * @module WPAdminProductNew
 */

/**
 * Internal dependencies
 */
import WPAdminProductEdit from './wp-admin-product-edit';

/**
 * The admin Add New Product screen
 *
 * @extends WPAdminProductEdit
 */
export default class WPAdminProductNew extends WPAdminProductEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
