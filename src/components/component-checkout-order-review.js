/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentCheckout from './component-checkout';

const SELECTOR = By.css( '#order_review' );

export default class ComponentCheckoutOrderReview extends ComponentCheckout {
	constructor( driver ) {
		super( driver, SELECTOR );
	}

	hasItem( item, { qty = '1', total = '$0' } ) {
		const selector = By.xpath(
			'//tr[@class="cart_item" and ' +
				`.//td[contains(., "${ item }") and contains(., "× ${ qty }")] and ` +
				`.//td[contains(., "${ total }")]` +
			']'
		);

		return helper.waitTillPresentAndDisplayed(
			this.driver,
			selector
		);
	}

	hasSubtotal( subtotal ) {
		const selector = By.xpath( `//tr[contains(@class, "cart-subtotal") and .//td[contains(., "${ subtotal }")]]` );
		this._mouseMoveTo( selector );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			selector
		);
	}

	hasShipping( shipping ) {
		const selector = By.xpath( `//tr[contains(@class, "shipping") and .//td[contains(., "${ shipping }")]]` );
		this._mouseMoveTo( selector );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			selector
		);
	}

	hasTax( tax ) {
		const selector = By.xpath( `//tr[contains(@class, "tax-rate") and .//td[contains(., "${ tax }")]]` );
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			selector
		);
	}

	hasTotal( total ) {
		const selector = By.xpath( `//tr[contains(@class, "order-total") and .//td[contains(., "${ total }")]]` );
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			selector
		);
	}
}
