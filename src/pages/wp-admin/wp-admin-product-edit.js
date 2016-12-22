/**
 * External dependencies
 */
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMetaBoxProductData from '../../components/wp-admin/component-meta-box-product-data';

export default class WPAdminProductEdit extends WPAdminPostEdit {
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxProductData: ComponentMetaBoxProductData
				}
			},
			args
		);
		super( driver, args );
	}
}
