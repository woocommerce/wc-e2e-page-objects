/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { Component } from 'wp-e2e-page-objects';

const SELECTOR = By.css( '#order_review' );

export default class ComponentOrderReview extends Component {
	constructor( driver ) {
		super( driver, SELECTOR );
	}
}
