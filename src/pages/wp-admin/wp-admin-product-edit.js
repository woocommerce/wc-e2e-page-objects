/**
 * @module WPAdminProductEdit
 */

/**
 * Internal dependencies
 */
import ComponentMetaBoxProductData from '../../components/wp-admin/component-meta-box-product-data';
import WPAdminClassicPostEdit from './wp-admin-classic-post-edit';

/**
 * The admin Edit Product screen
 *
 * @extends WPAdminPostEdit
 */
export default class WPAdminProductEdit extends WPAdminClassicPostEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxProductData: ComponentMetaBoxProductData,
				},
			},
			args
		);
		super( driver, args );
	}
}
