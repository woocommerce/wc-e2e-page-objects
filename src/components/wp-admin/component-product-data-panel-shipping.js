/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#shipping_product_data' );
const WEIGHT_SELECTOR = By.css( '#_weight' );
const DIMENSION_LENGTH_SELECTOR = By.css( 'input[name="_length"]' );
const DIMENSION_WIDTH_SELECTOR = By.css( 'input[name="_width"]' );
const DIMENSION_HEIGHT_SELECTOR = By.css( 'input[name="_height"]' );
const SHIPPING_CLASS_SELECTOR = By.css( '#product_shipping_class' );

export default class ComponentProductDataPanelShipping extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setWeight( weight ) {
		return helper.setWhenSettable( this.driver, WEIGHT_SELECTOR, weight );
	}

	setDimensionLength( length ) {
		return helper.setWhenSettable( this.driver, DIMENSION_LENGTH_SELECTOR, length );
	}

	setDimensionWidth( width ) {
		return helper.setWhenSettable( this.driver, DIMENSION_WIDTH_SELECTOR, width );
	}

	setDimensionHeight( height ) {
		return helper.setWhenSettable( this.driver, DIMENSION_HEIGHT_SELECTOR, height );
	}

	selectShippingClass( option ) {
		return helper.selectOption( this.driver, SHIPPING_CLASS_SELECTOR, option );
	}
}
