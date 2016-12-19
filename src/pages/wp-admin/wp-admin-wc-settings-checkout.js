/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import WPAdminWCSettings from './wp-admin-wc-settings';

const defaultArgs = {
	url: '',
	visit: true,
};

const ENABLE_COUPONS_SELECTOR = By.css( '#woocommerce_enable_coupons' );
const CALC_DISCOUNTS_SEQUENTIALLY = By.css( '#calc_discounts_sequentially' );

export default class WPAdminWCSettingsCheckout extends WPAdminWCSettings {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	checkEnableCoupons() {
		return helper.setCheckbox( this.driver, ENABLE_COUPONS_SELECTOR );
	}

	uncheckEnableCoupons() {
		return helper.unsetCheckbox( this.driver, ENABLE_COUPONS_SELECTOR );
	}

	checkCalculateDiscountsSequentially() {
		return helper.setCheckbox( this.driver, CALC_DISCOUNTS_SEQUENTIALLY );
	}

	uncheckCalculateDiscountsSequentially() {
		return helper.unsetCheckbox( this.driver, CALC_DISCOUNTS_SEQUENTIALLY );
	}
}
