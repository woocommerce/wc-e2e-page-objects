/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#general_coupon_data' );
const DISCOUNT_TYPE_SELECTOR = By.css( '#discount_type' );
const COUPON_AMOUNT_SELECTOR = By.css( '#coupon_amount' );
const ALLOW_FREE_SHIPPING_SELECTOR = By.css( '#free_shipping' );
const EXPIRY_DATE_SELECTOR = By.css( '#expiry_date' );

export default class ComponentCouponDataPanelGeneral extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	selectDiscountType( type ) {
		return helper.selectOption( this.driver, DISCOUNT_TYPE_SELECTOR, type );
	}

	setCouponAmount( amount ) {
		return helper.setWhenSettable( this.driver, COUPON_AMOUNT_SELECTOR, amount );
	}

	checkAllowFreeShipping() {
		return helper.setCheckbox( this.driver, ALLOW_FREE_SHIPPING_SELECTOR );
	}

	uncheckAllowFreeShipping() {
		return helper.unsetCheckbox( this.driver, ALLOW_FREE_SHIPPING_SELECTOR );
	}

	setCouponExpiryDate( date ) {
		return helper.setWhenSettable( this.driver, EXPIRY_DATE_SELECTOR, date );
	}
}
