/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#advanced_product_data' );
const PURCHASE_NOTE_SELECTOR = By.css( '#_purchase_note' );
const MENU_ORDER_SELECTOR = By.css( '#menu_order' );
const ENABLE_REVIEWS_SELECTOR = By.css( '#comment_status' );

export default class ComponentProductDataPanelAdvanced extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setPurchaseNote( note ) {
		return helper.setWhenSettable( this.driver, PURCHASE_NOTE_SELECTOR, note );
	}

	setMenuOrder( order ) {
		return helper.setWhenSettable( this.driver, MENU_ORDER_SELECTOR, order );
	}

	uncheckEnableReviews() {
		return helper.unsetCheckbox( this.driver, ENABLE_REVIEWS_SELECTOR );
	}
}
