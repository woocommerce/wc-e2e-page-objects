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

	openNewOrder() {
		return this.open( PAGE.WP_ADMIN_NEW_ORDER );
	}

	openNewCoupon() {
		return this.open( PAGE.WP_ADMIN_NEW_COUPON );
	}

	openGeneralSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_GENERAL );
	}

	openTaxSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_TAX );
	}

	openShippingZonesSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_SHIPPING_ZONES );
	}

	setGeneralSettings( args ) {
		const settings = this.openGeneralSettings();

		args = Object.assign(
			{
				baseLocation: [ 'United States', 'United States (US) — California' ],
				sellingLocation: 'Sell to all countries',
				enableTaxes: true,
				currency: [ 'United States', 'United States dollar ($)' ],
			},
			args
		);

		if ( Array.isArray( args.baseLocation ) && 2 === args.baseLocation.length ) {
			settings.selectBaseLocation( ...args.baseLocation );
		}

		if ( args.sellingLocation ) {
			settings.selectSellingLocation( args.sellingLocation );
		}

		if ( args.enableTaxes ) {
			settings.checkEnableTaxes();
		}

		if ( Array.isArray( args.currency ) && 2 === args.currency.length ) {
			settings.selectCurrency( ...args.currency );
		}

		return settings.saveChanges();
	}

	openCheckoutSettings() {
		return this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT );
	}

	enableCOD() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_COD );
		this.currentPage.checkEnable();
		return this.currentPage.saveChanges();
	}

	enableBACS() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_BACS );
		this.currentPage.checkEnable();
		return this.currentPage.saveChanges();
	}

	enablePayPal() {
		this.open( PAGE.WP_ADMIN_WC_SETTINGS_CHECKOUT_PAYPAL );
		this.currentPage.checkEnable();
		return this.currentPage.saveChanges();
	}
}
