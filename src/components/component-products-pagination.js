/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PAGINATION_SELECTOR = By.css( '.woocommerce-pagination' );

export default class ComponentProductsPagination extends Component {
	constructor( driver ) {
		super( driver, PAGINATION_SELECTOR );
	}
}
