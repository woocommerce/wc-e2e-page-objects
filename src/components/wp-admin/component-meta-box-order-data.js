/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

/**
 * Internal Dependencies
 */
import * as wcHelper from '../../helper';

const METABOX_SELECTOR = By.css( '#woocommerce-order-data' );
const ORDER_DATE_SELECTOR = By.css( '#order_date' );
const ORDER_DATE_HOUR_SELECTOR = By.css( '#order_date_hour' );
const ORDER_DATE_MINUTE_SELECTOR = By.css( '#order_date_minute' );
const ORDER_STATUS_SELECTOR = By.css( '#s2id_order_status .select2-choice b' );
const CUSTOMER_SELECTOR = By.css( '#s2id_customer_user .select2-choice b' );

export default class ComponentMetaBoxOrderData extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	selectOrderStatus( status ) {
		return wcHelper.select2Option( this.driver, ORDER_STATUS_SELECTOR, status );
	}

	hasOrderStatus( status ) {
		const selector = By.xpath(
			'//div[@id="s2id_order_status"]' +
			`//span[contains(@class, "select2-chosen") and contains(., "${ status }")]`
		);
		return helper.isEventuallyPresentAndDisplayed( this.driver, selector );
	}

	selectCustomer( keyword, exactOption ) {
		return wcHelper.select2OptionWithSearch( this.driver, CUSTOMER_SELECTOR, keyword, exactOption );
	}

	setOrderDate( date ) {
		return helper.setWhenSettable( this.driver, ORDER_DATE_SELECTOR, date );
	}

	setOrderDateHour( hour ) {
		return helper.setWhenSettable( this.driver, ORDER_DATE_HOUR_SELECTOR, hour );
	}

	setOrderDateMinute( minute ) {
		return helper.setWhenSettable( this.driver, ORDER_DATE_MINUTE_SELECTOR, minute );
	}
}
