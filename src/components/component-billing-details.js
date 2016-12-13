/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { Component } from 'wp-e2e-page-objects';

const SELECTOR = By.css( '.customer-billing-fields' );

export default class ComponentBillingDetails extends Component {
	constructor( driver ) {
		super( driver, SELECTOR, { wait: false } );
	}
}
