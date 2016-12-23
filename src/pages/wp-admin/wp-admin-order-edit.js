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

export default class WPAdminOrderEdit extends WPAdminPostEdit {
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxOrderData: ComponentMetaBoxOrderData,
					metaBoxOrderItems: ComponentMetaBoxOrderItems,
					metaBoxOrderActions: ComponentMetaBoxOrderActions,
					metaBoxOrderNotes: ComponentMetaBoxOrderNotes,
					metaBoxDownloadableProductPermissions: ComponentMetaBoxOrderDownloads,
				}
			},
			args
		);
		super( driver, args );
	}
}
