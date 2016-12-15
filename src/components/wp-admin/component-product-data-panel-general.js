/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#general_product_data' );
const REGULAR_PRICE_SELECTOR = By.css( '#_regular_price' );
const SALE_PRICE_SELECTOR = By.css( '#_sale_price' );
const TAX_STATUS_SELECTOR = By.css( '#_tax_status' );
const TAX_CLASS_SELECTOR = By.css( '#_tax_class' );

export default class ComponentProductDataPanelGeneral extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setRegularPrice( price ) {
		return helper.setWhenSettable( this.driver, REGULAR_PRICE_SELECTOR, price );
	}

	setSalePrice( price ) {
		return helper.setWhenSettable( this.driver, SALE_PRICE_SELECTOR, price );
	}

	selectTaxStatus( status ) {
		return helper.selectOption( this.driver, TAX_STATUS_SELECTOR, status );
	}

	selectTaxClass( classOption ) {
		return helper.selectOption( this.driver, TAX_CLASS_SELECTOR, classOption );
	}
}
