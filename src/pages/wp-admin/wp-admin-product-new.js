/**
 * Internal dependencies
 */
import WPAdminProductEdit from './wp-admin-product-edit';

export default class WPAdminProductNew extends WPAdminProductEdit {
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
