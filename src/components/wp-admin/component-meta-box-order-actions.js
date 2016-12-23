/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

const METABOX_SELECTOR = By.css( '#woocommerce-order-actions' );
const SAVE_ORDER_SELECTOR = By.css( '#woocommerce-order-actions .save_order' );
const SELECT_ACTIONS_SELECTOR = By.css( 'select[name="wc_order_action"]' );
const PERFORM_ACTION_SELECTOR = By.css( '#actions .wc-reload' );

export default class ComponentMetaBoxOrderActions extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	saveOrder() {
		return helper.clickWhenClickable( this.driver, SAVE_ORDER_SELECTOR );
	}

	selectAction( action ) {
		return helper.selectOption( this.driver, SELECT_ACTIONS_SELECTOR, action );
	}

	performAction() {
		return helper.clickWhenClickable( this.driver, PERFORM_ACTION_SELECTOR );
	}
}
