/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { Component } from 'wp-e2e-page-objects';

const ORDERBY_SELECTOR = By.css( '.orderby' );

export default class ComponentProductsSorter extends Component {
	constructor( driver, selector = ORDERBY_SELECTOR ) {
		super( driver, selector );
	}

	sortBy( optionText ) {
		const select = this.driver.findElement(
			By.css( ORDERBY_SELECTOR )
		);

		select.click();

		return select.findElement(
			By.xpath( `//select[@class=ordery]/option[contains(text(), "${ optionText }")]` )
		).click();
	}
}
