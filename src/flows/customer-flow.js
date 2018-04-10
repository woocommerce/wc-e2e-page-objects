/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies.
 */
import { PAGE } from '../page-map';
import GuestCustomerFlow from './guest-customer-flow';

const defaultArgs = {
	baseUrl: 'http://example.com',
	username: '',
	password: '',
};

export default class CustomerFlow extends GuestCustomerFlow {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
		this.username = args.username;
		this.password = args.password;

		helper.clearCookiesAndDeleteLocalStorage( this.driver );
		this.open( PAGE.MY_ACCOUNT );
		this.currentPage.login( this.username, this.password );
	}

	logout() {
		this.open( PAGE.MY_ACCOUNT );
		this.currentPage.logout();
	}
}
