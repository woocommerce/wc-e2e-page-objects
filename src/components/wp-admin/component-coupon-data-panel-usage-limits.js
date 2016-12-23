/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const PANEL_SELECTOR = By.css( '#general_coupon_data' );
const LIMIT_PER_COUPON_SELECTOR = By.css( '#usage_limit' );
const LIMIT_PER_USER_SELECTOR = By.css( '#usage_limit_per_user' );

export default class ComponentCouponDataPanelUsageLimits extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setUsageLimitPerCoupon( limit ) {
		return helper.setWhenSettable( this.driver, LIMIT_PER_COUPON_SELECTOR, limit );
	}

	setUsageLimitPerUser( limit ) {
		return helper.setWhenSettable( this.driver, LIMIT_PER_USER_SELECTOR, limit );
	}
}
