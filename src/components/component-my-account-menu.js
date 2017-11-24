/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const MENU_SELECTOR = By.css( '.woocommerce-MyAccount-navigation' );

export default class ComponentMyAccountMenu extends Component {
	constructor( driver, selector = MENU_SELECTOR ) {
		super( driver, selector, { wait: false } );
	}

	hasMenu( menu ) {
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( this._getMenuXpathExpression( menu ) )
		);
	}

	click( menu ) {
		const selector = By.xpath(
			this._getMenuXpathExpression( menu )
		);

		return helper.clickWhenClickable( this.driver, selector );
	}

	_getMenuXpathExpression( menu ) {
		return `//nav[@class="woocommerce-MyAccount-navigation"]//li/a[contains(text(), "${ menu }")]`;
	}
}
