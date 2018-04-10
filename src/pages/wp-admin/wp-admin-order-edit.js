/**
 * @module WPAdminOrderEdit
 */

/**
 * External dependencies
 */
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMetaBoxOrderData from '../../components/wp-admin/component-meta-box-order-data';
import ComponentMetaBoxOrderItems from '../../components/wp-admin/component-meta-box-order-items';
import ComponentMetaBoxOrderActions from '../../components/wp-admin/component-meta-box-order-actions';
import ComponentMetaBoxOrderNotes from '../../components/wp-admin/component-meta-box-order-notes';
import ComponentMetaBoxOrderDownloads from '../../components/wp-admin/component-meta-box-order-downloads';

/**
 * The admin Edit Order page
 *
 * @extends WPAdminPostEdit
 */
export default class WPAdminOrderEdit extends WPAdminPostEdit {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxOrderData: ComponentMetaBoxOrderData,
					metaBoxOrderItems: ComponentMetaBoxOrderItems,
					metaBoxOrderActions: ComponentMetaBoxOrderActions,
					metaBoxOrderNotes: ComponentMetaBoxOrderNotes,
					metaBoxDownloadableProductPermissions: ComponentMetaBoxOrderDownloads,
				},
			},
			args
		);
		super( driver, args );
	}
}
