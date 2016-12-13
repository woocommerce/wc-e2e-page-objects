/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

/**
 * External dependencies
 */

const SELECTOR = By.css( '.cart_totals' );

export default class ComponentCartTotals extends Component {
	constructor( driver, selector = SELECTOR, args = { wait: false, waitMs: 10000 } ) {
		super( driver, selector, args );
	}

	hasSubtotal( subtotal ) {
		const selector = By.xpath( `//tr[@class="cart-subtotal" and .//span[contains(text(), "${ subtotal }")]]` );
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			selector
		);
	}
}
