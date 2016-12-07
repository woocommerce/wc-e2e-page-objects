/**
 * External dependencies
 */
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentProductCard from '../components/component-product-card.js';
import ComponentProductsSorter from '../components/component-products-sorter';
import ComponentProductsPagination from '../components/component-products-pagination';

const defaultArgs = {
	visit: true,
	components: {
		sorter: ComponentProductsSorter,
		pagination: ComponentProductsPagination
	}
};

export default class ShopPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	clickProduct( productTitle ) {
		const card = new ComponentProductCard( this.driver, productTitle );
		return card.click();
	}

	addProductToCart( productTitle ) {
		const card = new ComponentProductCard( this.driver, productTitle );
		return card.addToCart();
	}

	sortBy( optionText = 'Default sorting' ) {
		return this.components.sorter.sortBy( optionText );
	}

	goToPage( pageNum ) {
		return this.compnoents.pagination.goToPage( pageNum );
	}

	nextPage() {
		return this.components.pagination.nextPage();
	}
}
