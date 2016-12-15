/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

export default class ComponentProductDataAttributeRow extends Component {
	constructor( driver, selector ) {
		super( driver, selector );
	}

	setName( name ) {
		const selector = By.css( this.selector.value + ' input[name^="attribute_name"]' );
		return helper.setWhenSettable( this.driver, selector, name );
	}

	checkVisibleOnTheProductPage() {
		const selector = By.css( this.selector.value + ' input[name^="attribute_visibility"]' );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckVisibleOnTheProductPage() {
		const selector = By.css( this.selector.value + ' input[name^="attribute_visibility"]' );
		return helper.unsetCheckbox( this.driver, selector );
	}

	checkUsedForVariations() {
		const selector = By.css( this.selector.value + ' input[name^="attribute_variation"]' );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckUsedForVariations() {
		const selector = By.css( this.selector.value + ' input[name^="attribute_variation"]' );
		return helper.unsetCheckbox( this.driver, selector );
	}

	setValue( value ) {
		const selector = By.css( this.selector.value + ' textarea[name^="attribute_values"]' );
		return helper.setWhenSettable( this.driver, selector, value );
	}

	toggle() {
		this.driver.actions().
			mouseMove( this.driver.findElement( By.css( this.selector.value + ' > h3' ) ) ).
			click().
			perform();
	}

	remove() {
		this.driver.actions().
			mouseMove( this.driver.findElement( By.css( this.selector.value + ' > h3 > .remove_row' ) ) ).
			click().
			perform();

		this.driver.switchTo().alert().accept();
	}
}
