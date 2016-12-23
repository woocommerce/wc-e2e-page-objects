/**
 * External dependencies
 */
import { WPAdminPosts } from 'wp-e2e-page-objects';

export default class WPAdminOrders extends WPAdminPosts {
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
