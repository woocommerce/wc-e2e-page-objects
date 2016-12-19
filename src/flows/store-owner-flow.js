/**
 * External dependencies
 */
import { UserFlow } from 'wp-e2e-page-objects';

/**
 * Internal dependencies.
 */
import { PAGE } from '../page-map';

export default class StoreOwnerFlow extends UserFlow {
	constructor( driver, args = { baseUrl: 'http://example.com', username: '', password: '' } ) {
		super( driver, args );
	}

	openProducts() {
		return this.open( PAGE.WP_ADMIN_PRODUCTS );
	}

	openNewProduct() {
		return this.open( PAGE.WP_ADMIN_NEW_PRODUCT );
	}

	openGeneralSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_GENERAL );
	}

	openCheckoutSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT );
	}

	enableCOD() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_COD );
		return this.currentPage.checkEnable();
	}

	enableBACS() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_BACS );
		return this.currentPage.checkEnable();
	}

	enablePayPal() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_PAYPAL );
		return this.currentPage.checkEnable();
	}
}
