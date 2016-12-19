/**
 * External dependencies
 */
import { Component } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import * as wcHelper from '../helper';

export default class ComponentCheckout extends Component {
	constructor( driver, selector ) {
		super( driver, selector );
	}

	_mouseMoveTo( selector ) {
		return wcHelper.mouseMoveTo( this.driver, selector );
	}
}
