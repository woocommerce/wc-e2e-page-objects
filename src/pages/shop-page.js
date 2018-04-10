/**
 * @module ShopPage
 */

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
		pagination: ComponentProductsPagination,
	},
};

/**
 * The front-end Shop page.
 *
 * @extends Page
 */
export default class ShopPage extends Page {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Click a product.
	*
 	* @param  {string}    productTitle - The title of the product to click.
 	* @return {Promise}   Promise that evaluates to `true` if product is found and clicked, `false` otherwise.
	*/
	clickProduct( productTitle ) {
		const card = new ComponentProductCard( this.driver, productTitle );
		return card.click();
	}

	/**
	* Add a product to the cart.
	*
 	* @param  {string}    productTitle - The title of the product to add.
 	* @return {Promise}   Promise that evaluates to `true` if product is found and added, `false` otherwise.
	*/
	addProductToCart( productTitle ) {
		const card = new ComponentProductCard( this.driver, productTitle );
		return card.addToCart();
	}

	/**
	* Change the shop product sorting
	*
 	* @param  {string}    optionText - The text of the sort option. Default: "Default sorting".
 	* @return {Promise}   Promise that evaluates to `true` if able to select sort option, `false` otherwise.
	*/
	sortBy( optionText = 'Default sorting' ) {
		return this.components.sorter.sortBy( optionText );
	}

	/**
	* Go to a specific shop page
	*
 	* @param  {number}    pageNum - The page number to go to.
 	* @return {Promise}   Promise that evaluates to `true` if able to go to specified page, `false` otherwise.
	*/
	goToPage( pageNum ) {
		return this.components.pagination.goToPage( pageNum );
	}

	/**
	* Go to the next shop page
	*
 	* @return {Promise}   Promise that evaluates to `true` if able to go to next page, `false` otherwise.
	*/
	nextPage() {
		return this.components.pagination.nextPage();
	}
}
