/**
 * External dependencies
 */
import { Component } from 'wp-e2e-page-objects';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

export default class ComponentCheckout extends Component {
	constructor( driver, selector ) {
		super( driver, selector );
	}

	_mouseMoveTo( selector ) {
		return helper.mouseMoveTo( this.driver, selector );
	}
}
