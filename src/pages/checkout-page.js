/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import * as wcHelper from '../helper';
import ComponentCheckoutBillingDetails from '../components/component-checkout-billing-details';
import ComponentCheckoutShippingDetails from '../components/component-checkout-shipping-details';
import ComponentCheckoutOrderReview from '../components/component-checkout-order-review';

const defaultArgs = {
	components: {
		billingDetails: ComponentCheckoutBillingDetails,
		shippingDetails: ComponentCheckoutShippingDetails,
		orderReview: ComponentCheckoutOrderReview
	}
};

const ORDER_NOTES_SELECTOR = By.css( '#order_comments' );
const SHIP_TO_DIFFERENT_ADDRESS_SELECTOR = By.css( '#ship-to-different-address-checkbox' );
const PLACE_ORDER_SELECTOR = By.css( '#place_order' );

export default class CheckoutPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	setOrderNotes( notes ) {
		return helper.setWhenSettable( this.driver, ORDER_NOTES_SELECTOR, notes );
	}

	checkShipToDifferentAddress() {
		wcHelper.mouseMoveTo( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
		return helper.setCheckbox( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
	}

	uncheckShipToDifferentAddress() {
		wcHelper.mouseMoveTo( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
		return helper.unsetCheckbox( this.driver, SHIP_TO_DIFFERENT_ADDRESS_SELECTOR );
	}

	selectPaymentMethod( name ) {
		const selector = By.xpath( `//li[contains(@class, "wc_payment_method")]//label[contains(.,"${ name }")]` );
		return this.driver.actions().
			mouseMove( this.driver.findElement( selector ), { x: 0, y: 0 } ).
			click().
			perform().then( () => {
				return true;
			}, () => {
				return false;
			} );
	}

	placeOrder() {
		return helper.clickWhenClickable( this.driver, PLACE_ORDER_SELECTOR );
	}
}
