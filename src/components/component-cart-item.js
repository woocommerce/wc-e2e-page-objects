/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

function getItemSelector( productTitle, args ) {
	return By.xpath(
		'//tr[contains(@class, "cart_item") and ' +
			getProductColumnExpression( productTitle ) +
			' and ' +
			getQtyColumnExpression( args ) +
		']'
	);
}

function getProductColumnExpression( productTitle ) {
	return 'td[@class="product-name" and ' +
		`a[contains(text(), "${ productTitle }")]` +
	']';
}

function getQtyColumnExpression( args ) {
	return 'td[@class="product-quantity" and ' + './/' + getQtyInputExpression( args ) + ']';
}

function getQtyInputExpression( args ) {
	let qtyValue = '';

	if ( args.checkQty ) {
		qtyValue = ` and @value="${ args.qty }"`;
	}

	return 'input[contains(@class, "input-text")' + qtyValue + ']';
}

function getRemoveExpression() {
	return 'td[@class="product-remove"]//a[@class="remove"]';
}

const defaultArgs = {
	checkQty: true,
	qty: 1,
};

export default class ComponentCartItem extends Component {
	constructor( driver, productTitle, args = {} ) {
		args = Object.assign( defaultArgs, args );
		const selector = getItemSelector( productTitle, args );
		super( driver, selector, args );
		this.productTitle = productTitle;
		this.selector = selector;
	}

	setQty( qty ) {
		const selector = By.xpath(
			getItemSelector( this.productTitle, { checkQty: false } ).value + '//' +
			getQtyInputExpression( { checkQty: false } )
		);

		const el = this.driver.findElement( selector );

		helper.waitForFieldClearable( this.driver, selector );
		el.sendKeys( qty );
	}

	remove() {
		const selector = By.xpath(
			getItemSelector( this.productTitle, { checkQty: false } ).value + '//' +
			getRemoveExpression()
		);

		helper.clickWhenClickable( this.driver, selector );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( 'div[@class="woocommerce-message" and contains(text(), "removed.")]' )
		);
	}
}
