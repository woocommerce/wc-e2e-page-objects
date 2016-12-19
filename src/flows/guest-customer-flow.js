/**
 * External dependencies
 */
import { VisitorFlow } from 'wp-e2e-page-objects';

/**
 * Internal dependencies.
 */
import { PAGE } from '../page-map';

export default class GuestCustomerFlow extends VisitorFlow {
	constructor( driver, args = { baseUrl: 'http://example.com' } ) {
		super( driver, args );
	}

	openShop() {
		return this.open( PAGE.SHOP );
	}

	fromShopAddProductsToCart( ...products ) {
		const shop = this.openShop();
		products.forEach( ( product ) => {
			shop.addProductToCart( product );
		} );
	}

	openCart() {
		return this.open( PAGE.CART );
	}

	openCheckout() {
		return this.open( PAGE.CHECKOUT );
	}
}
