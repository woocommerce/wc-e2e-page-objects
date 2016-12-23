/**
 * Internal dependencies
 */
import WPAdminOrderEdit from './wp-admin-order-edit';

export default class WPAdminOrderNew extends WPAdminOrderEdit {
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
