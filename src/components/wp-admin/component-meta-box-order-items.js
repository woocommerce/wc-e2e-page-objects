/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import * as wcHelper from '../../helper';

const METABOX_SELECTOR = By.css( '#woocommerce-order-items' );
const ADD_ITEMS_SELECTOR = By.css( '.add-line-item' );
const ADD_PRODUCTS_SELECTOR = By.css( '.add-order-item' );
const ADD_FEE_SELECTOR = By.css( '.add-order-fee' );
const ADD_SHIPPING_COST_SELECTOR = By.css( '.add-order-shipping' );
const SAVE_SELECTOR = By.css( '.save-action' );
const CANCEL_SELECTOR = By.css( '.cancel-action' );
const ADD_IN_DIALOG_SELECTOR = By.css( '#btn-ok' );
const REFUND_BUTTON_SELECTOR = By.css( '.refund-items' );
const REFUND_AMOUNT_SELECTOR = By.css( '#refund_amount' );
const REFUND_REASON_SELECTOR = By.css( '#refund_reason' );
const REFUND_MANUALLY_SELECTOR = By.css( '.do-manual-refund' );
const REFUND_API_SELECTOR = By.css( '.do-api-refund' );

export default class ComponentMetaBoxOrderItems extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	clickAddItems() {
		return helper.clickWhenClickable( this.driver, ADD_ITEMS_SELECTOR );
	}

	addProduct( keyword, exactOption ) {
		this.clickAddtems();
		this.clickAddProducts();
		wcHelper.selectOption2WithSearch( keyword, exactOption );
		helper.clickWhenClickable( this.driver, ADD_IN_DIALOG_SELECTOR );
		return wcHelper.waitTillUIBlockNotPresent( this.driver );
	}

	clickAddProducts() {
		return helper.clickWhenClickable( this.driver, ADD_PRODUCTS_SELECTOR );
	}

	clickAddFee() {
		return helper.clickWhenClickable( this.driver, ADD_FEE_SELECTOR );
	}

	clickAddShippingCost() {
		return helper.clickWhenClickable( this.driver, ADD_SHIPPING_COST_SELECTOR );
	}

	clickSave() {
		return helper.clickWhenClickable( this.driver, SAVE_SELECTOR );
	}

	clickCancel() {
		return helper.clickWhenClickable( this.driver, CANCEL_SELECTOR );
	}

	refundManually( amount, reason = '' ) {
		this.clickRefund();
		this.setRefundAmount( amount );
		this.setRefundReason( reason );
		this.clickRefundManually();
	}

	refundViaGateway( amount, reason = '' ) {
		this.clickRefund();
		this.setRefundAmount( amount );
		this.setRefundReason( reason );
		this.clickRefundViaGateway();
	}

	clickRefund() {
		return helper.clickWhenClickable( this.driver, REFUND_BUTTON_SELECTOR );
	}

	setRefundAmount( amount ) {
		return helper.setWhenSettable( this.driver, REFUND_AMOUNT_SELECTOR, amount );
	}

	setRefundReason( reason ) {
		return helper.setWhenSettable( this.driver, REFUND_REASON_SELECTOR, reason );
	}

	clickRefundManually() {
		helper.clickWhenClickable( this.driver, REFUND_MANUALLY_SELECTOR );
		wcHelper.waitTillAlertAccepted( this.driver );
		return wcHelper.waitTillUIBlockNotPresent( this.driver );
	}

	clickRefundViaGateway() {
		helper.clickWhenClickable( this.driver, REFUND_API_SELECTOR );
		wcHelper.waitTillAlertAccepted( this.driver );
		return wcHelper.waitTillUIBlockNotPresent( this.driver );
	}
}
