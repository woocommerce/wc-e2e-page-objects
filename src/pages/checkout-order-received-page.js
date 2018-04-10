/**
 * @module CheckoutOrderReceivedPage
 */

/**
 * External dependencies
 */
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentOrderDetails from '../components/component-order-details';
import ComponentOrderCustomerDetails from '../components/component-order-customer-details';
import ComponentOrderBillingAddress from '../components/component-order-billing-address';
import ComponentOrderShippingAddress from '../components/component-order-shipping-address';

const defaultArgs = {
	components: {
		orderDetails: ComponentOrderDetails,
		customerDetails: ComponentOrderCustomerDetails,
		billingAddress: ComponentOrderBillingAddress,
		shippingAddress: ComponentOrderShippingAddress,
	},
};

/**
 * The front-end Checkout success page.
 *
 * @extends Page
 */
export default class CheckoutOrderReceivedPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}
