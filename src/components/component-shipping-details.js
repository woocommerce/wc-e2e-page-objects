/**
 * External dependencies
 */
import { Component } from 'wp-e2e-page-objects';

const SELECTOR = '.woocommerce-shipping-fields';

export default class ComponentShippingDetails extends Component {
	constructor( driver ) {
		super( driver, SELECTOR );
	}
}
