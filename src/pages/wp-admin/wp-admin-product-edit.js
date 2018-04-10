/**
 * @module WPAdminProductEdit
 */

/**
 * External dependencies
 */
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMetaBoxProductData from '../../components/wp-admin/component-meta-box-product-data';

/**
 * The admin Edit Product screen
 *
 * @extends WPAdminPostEdit
 */
export default class WPAdminProductEdit extends WPAdminPostEdit {
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
