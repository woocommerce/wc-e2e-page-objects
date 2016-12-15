/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#inventory_product_data' );
const SKU_SELECTOR = By.css( '#_sku' );
const MANAGE_STOCK_SELECTOR = By.css( '#_manage_stock' );
const STOCK_STATUS_SELECTOR = By.css( '#_stock_status' );
const STOCK_QTY_SELECTOR = By.css( '#_stock' );
const ALLOW_BACKORDERS_SELECTOR = By.css( '#_backorders' );
const SOLD_INDIVIDUALLY_SELECTOR = By.css( '#_sold_individually' );

export default class ComponentProductDataPanelInventory extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setSKU( sku ) {
		return helper.setWhenSettable( this.driver, SKU_SELECTOR, sku );
	}

	checkManageStock() {
		return helper.setCheckbox( this.driver, MANAGE_STOCK_SELECTOR );
	}

	uncheckManageStock() {
		return helper.unsetCheckbox( this.driver, MANAGE_STOCK_SELECTOR );
	}

	selectStockStatus( status ) {
		return helper.selectOption( this.driver, STOCK_STATUS_SELECTOR, status );
	}

	checkSoldIndividually() {
		return helper.setCheckbox( this.driver, SOLD_INDIVIDUALLY_SELECTOR );
	}

	uncheckSoldIndividually() {
		return helper.unsetCheckbox( this.driver, SOLD_INDIVIDUALLY_SELECTOR );
	}

	setStockQty( qty ) {
		return helper.setWhenSettable( this.driver, STOCK_QTY_SELECTOR, qty );
	}

	selectAllowBackorders( option ) {
		return helper.selectOption( this.driver, ALLOW_BACKORDERS_SELECTOR, option );
	}
}
