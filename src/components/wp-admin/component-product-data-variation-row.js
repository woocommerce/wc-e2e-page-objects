/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';
import * as wcHelper from '../../helper';

export default class ComponentProductDataVariationRow extends Component {
	constructor( driver, selector ) {
		super( driver, selector );
	}

	checkEnabled() {
		const selector = By.css( this.selector.value + ' input[name^="variable_enabled"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckEnabled() {
		const selector = By.css( this.selector.value + ' input[name^="variable_enabled"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	checkVirtual() {
		const selector = By.css( this.selector.value + ' input[name^="variable_is_virtual"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckVirtual() {
		const selector = By.css( this.selector.value + ' input[name^="variable_is_virtual"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	checkDownloadable() {
		const selector = By.css( this.selector.value + ' input[name^="variable_is_downloadable"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckDownloadable() {
		const selector = By.css( this.selector.value + ' input[name^="variable_is_downloadable"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	checkManageStock() {
		const selector = By.css( this.selector.value + ' input[name^="variable_manage_stock"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.setCheckbox( this.driver, selector );
	}

	uncheckManageStock() {
		const selector = By.css( this.selector.value + ' input[name^="variable_manage_stock"]' );
		helper.mouseMoveTo( this.driver, this.selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	setRegularPrice( price ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_regular_price"]' );
		return helper.setWhenSettable( this.driver, selector, price );
	}

	setSalePrice( price ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_sale_price"]' );
		return helper.setWhenSettable( this.driver, selector, price );
	}

	selectTaxClass( classOption ) {
		const selector = By.css( this.selector.value + ' select[name^="variable_tax_class"]' );
		return helper.selectOption( this.driver, selector, classOption );
	}

	setSKU( sku ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_sku"]' );
		return helper.setWhenSettable( this.driver, selector, sku );
	}

	selectStockStatus( status ) {
		const selector = By.css( this.selector.value + ' select[name^="variable_stock_status"]' );
		return helper.selectOption( this.driver, selector, status );
	}

	setStockQty( qty ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_stock"]' );
		return helper.setWhenSettable( this.driver, selector, qty );
	}

	selectAllowBackorders( option ) {
		const selector = By.css( this.selector.value + ' select[name^="variable_backorders"]' );
		return helper.selectOption( this.driver, selector, option );
	}

	setWeight( weight ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_weight"]' );
		return helper.setWhenSettable( this.driver, selector, weight );
	}

	setDimensionLength( length ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_length"]' );
		return helper.setWhenSettable( this.driver, selector, length );
	}

	setDimensionWidth( width ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_width"]' );
		return helper.setWhenSettable( this.driver, selector, width );
	}

	setDimensionHeight( height ) {
		const selector = By.css( this.selector.value + ' input[name^="variable_height"]' );
		return helper.setWhenSettable( this.driver, selector, height );
	}

	selectShippingClass( option ) {
		const selector = By.css( this.selector.value + ' select[name^="variable_shipping_class"]' );
		return helper.selectOption( this.driver, selector, option );
	}

	setVariationDescrtiption( description ) {
		const selector = By.css( this.selector.value + ' textarea[name^="variable_description"]' );
		return helper.setWhenSettable( this.driver, selector, description );
	}

	toggle() {
		wcHelper.waitTillAnimationFinished( this.driver );

		this.driver.actions().
			mouseMove( this.driver.findElement( By.css( this.selector.value + ' > h3 > .handlediv' ) ) ).
			click().
			perform();

		return helper.waitTillPresentAndDisplayed( this.driver, By.css( this.selector.value + ' .wc-metabox-content' ) );
	}

	remove() {
		this.driver.actions().
			mouseMove( this.driver.findElement( By.css( this.selector.value + ' > h3 > .remove_variation' ) ) ).
			click().
			perform();

		return this.driver.switchTo().alert().accept();
	}
}
