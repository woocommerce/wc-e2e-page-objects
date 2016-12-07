/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { Component } from 'wp-e2e-page-objects';

/**
 * External dependencies
 */

const SELECTOR = By.css( '.cart_totals' );

export default class ComponentCartTotals extends Component {
	constructor( driver, selector = SELECTOR, args = { wait: false, waitMs: 10000 } ) {
		super( driver, selector, args );
	}
}
