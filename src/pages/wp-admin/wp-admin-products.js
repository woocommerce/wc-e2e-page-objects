/**
 * External dependencies
 */
import { WPAdminPosts } from 'wp-e2e-page-objects';

export default class WPAdminProducts extends WPAdminPosts {
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}
