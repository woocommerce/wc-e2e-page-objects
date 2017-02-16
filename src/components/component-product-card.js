/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

export default class ComponentProductCard extends Component {
	constructor( driver, productTitle ) {
		const selector = By.xpath(
			`//li[contains(@class, "type-product") and a/h3[contains(text(), "${ productTitle }")]]`
		);
		super( driver, selector );

		this.productTitle = productTitle;
	}

	click() {
		const expression = `//li[contains(@class, "type-product")]/a[h2[contains(text(), "${ this.productTitle }")]]`;
		return helper.clickWhenClickable(
			this.driver,
			By.xpath( expression )
		);
	}

	addToCart() {
		const expression =
			`//li[contains(@class, "type-product") and a/h2[contains(text(), "${ this.productTitle }")]]` +
			'//a[contains(@class, "add_to_cart_button") and contains(@class, "ajax_add_to_cart")]'
		;
		helper.clickWhenClickable(
			this.driver,
			By.xpath( expression )
		);

		// Wait for view cart button appears.
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			this._getViewCartSelector()
		);
	}

	_getViewCartSelector() {
		return By.xpath(
			`//li[contains(@class, "type-product") and a/h2[contains(text(), "${ this.productTitle }")]]` +
			'//a[contains(@class, "added_to_cart") and contains(@class, "wc-forward")]'
		);
	}

	viewCart() {
		return helper.clickWhenClickable(
			this.driver,
			this._getViewCartSelector()
		);
	}

	selectOptions() {
		const expression =
			`//li[@class="type-product" and a//h2[contains(text(), "${ this.productTitle }")]]` +
			'//a[@class="add_to_cart_button"]'
		;
		return helper.clickWhenClickable(
			this.driver,
			By.xpath( expression )
		);
	}
}
