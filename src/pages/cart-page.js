/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentCartTotals from '../components/component-cart-totals';
import ComponentCartItem from '../components/component-cart-item';

const CART_EMPTY_SELECTOR = By.css( '.cart-empty' );
const RETURN_TO_SHOP_SELECTOR = By.css( '.return-to-shop' );
const UPDATE_CART_SELECTOR = By.css( 'input[name="update_cart"]' );

const defaultArgs = {
	components: {
		cartTotals: ComponentCartTotals
	}
};

export default class CartPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	returnToShop() {
		return helper.clickWhenClickable(
			this.driver,
			RETURN_TO_SHOP_SELECTOR
		);
	}

	hasNoItem() {
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			CART_EMPTY_SELECTOR
		);
	}

	hasItem( productTitle, args = { qty: 1 } ) {
		const item = new ComponentCartItem( this.driver, productTitle, args );
		return item.displayed();
	}

	getItem( productTitle, args = { qty: 1 } ) {
		return new ComponentCartItem( this.driver, productTitle, args );
	}

	update() {
		helper.clickWhenClickable(
			this.driver,
			UPDATE_CART_SELECTOR
		);

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( '//div[@class="woocommerce-message" and contains(text(), "Cart updated")]' )
		);
	}
}
