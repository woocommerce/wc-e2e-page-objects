/**
 * External dependencies
 */
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentBillingDetails from '../components/component-billing-details';
import ComponentShippingDetails from '../components/component-shipping-details';
import ComponentOrderReview from '../components/component-order-review';

const defaultArgs = {
	components: {
		billingDetails: ComponentBillingDetails,
		shippingDetails: ComponentShippingDetails,
		orderReview: ComponentOrderReview
	}
};

export default class CheckoutPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}
