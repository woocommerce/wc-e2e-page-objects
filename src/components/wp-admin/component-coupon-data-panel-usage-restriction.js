/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

/**
 * Internal helper
 */
import * as wcHelper from '../../helper';

const PANEL_SELECTOR = By.css( '#general_coupon_data' );
const MINIMUM_SPEND_SELECTOR = By.css( '#minimum_amount' );
const MAXIMUM_SPEND_SELECTOR = By.css( '#maximum_amount' );
const INDIVIDUAL_USE_SELECTOR = By.css( '#individual_use' );
const EXCLUDE_SALE_ITEMS_SELECTOR = By.css( '#exclude_sale_items' );
const EMAIL_RESTRICTIONS_SELECTOR = By.css( '#customer_email' );

export default class ComponentCouponDataPanelUsageRestriction extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	setMinimumSpend( minimum ) {
		return helper.setWhenSettable( this.driver, MINIMUM_SPEND_SELECTOR, minimum );
	}

	setMaximumSpend( maximum ) {
		return helper.setWhenSettable( this.driver, MAXIMUM_SPEND_SELECTOR, maximum );
	}

	checkIndividualUseOnly() {
		return wcHelper.setCheckbox( this.driver, INDIVIDUAL_USE_SELECTOR );
	}

	uncheckIndividualUseOnly() {
		return wcHelper.unsetCheckbox( this.driver, INDIVIDUAL_USE_SELECTOR );
	}

	checkExcludeSaleItems() {
		return wcHelper.setCheckbox( this.driver, EXCLUDE_SALE_ITEMS_SELECTOR );
	}

	uncheckExcludeSaleItems() {
		return wcHelper.unsetCheckbox( this.driver, EXCLUDE_SALE_ITEMS_SELECTOR );
	}

	setEmailRestrictions( emails ) {
		return helper.setWhenSettable( this.driver, EMAIL_RESTRICTIONS_SELECTOR, emails );
	}
}
