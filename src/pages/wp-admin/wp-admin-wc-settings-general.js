/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import * as wcHelper from '../../helper';
import WPAdminWCSettings from './wp-admin-wc-settings';

const BASE_LOCATION_SELECTOR = By.xpath(
	'//select[@name="woocommerce_default_country"]' +
	'/preceding-sibling::div[contains(@class, "wc-enhanced-select")]' +
	'//b'
);
const SELLING_LOCATION_SELECTOR = By.css( '#s2id_woocommerce_allowed_countries .select2-choice b' );
const SELL_TO_SPECIFIC_COUNTRIES_SELECTOR = By.xpath(
	'//select[@name="woocommerce_specific_allowed_countries[]"]' +
	'/preceding-sibling::div[contains(@class, "wc-enhanced-select")]' +
	'//input[contains(@class, "select2-input")]'
);
const ENABLE_TAXES_SELECTOR = By.css( '#woocommerce_calc_taxes' );
const STORE_NOTICE_SELECTOR = By.css( '#woocommerce_demo_store' );
const THOUSAND_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_thousand_sep' );
const DECIMAL_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_decimal_sep' );
const NUMBER_OF_DECIMALS_SELECTOR = By.css( '#woocommerce_price_num_decimals' );

const defaultArgs = {
	url: '',
	visit: true,
};

export default class WPAdminSettingsGeneral extends WPAdminWCSettings {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	selectBaseLocation( keyword, exactOption ) {
		return wcHelper.select2OptionWithSearch( this.driver, BASE_LOCATION_SELECTOR, keyword, exactOption );
	}

	selectSellingLocation( option ) {
		return wcHelper.select2Option( this.driver, SELLING_LOCATION_SELECTOR, option );
	}

	setSellToSpecificCountries( keyword, exactOption ) {
		return wcHelper.setSelect2WithSearch( this.driver, SELL_TO_SPECIFIC_COUNTRIES_SELECTOR, keyword, exactOption );
	}

	removeChoiceInSellToSpecificCountries( choice ) {
		// TODO: maybe move this to wcHelper.
		const selector = By.xpath(
			'//select[@name="woocommerce_specific_allowed_countries[]"]' +
			'/preceding-sibling::div[contains(@class, "wc-enhanced-select")]' +
			`//div[contains(.,"${ choice }")]` +
			'/following-sibling::a[contains(@class, "select2-search-choice-close")]'
		);

		// Make it doesn't trigger error when element is not found.
		return this.driver.findElement( selector ).then( ( el ) => {
			return el.click().then( () => {
				return true;
			}, () => {
				return false;
			} );
		}, () => {
			return false;
		} );
	}

	checkEnableTaxes() {
		helper.unsetCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
	}

	uncheckEnableTaxes() {
		helper.setCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
	}

	checkStoreNotice() {
		helper.unsetCheckbox( this.driver, STORE_NOTICE_SELECTOR );
		return helper.setCheckbox( this.driver, STORE_NOTICE_SELECTOR );
	}

	uncheckStoreNotice() {
		helper.setCheckbox( this.driver, STORE_NOTICE_SELECTOR );
		return helper.unsetCheckbox( this.driver, STORE_NOTICE_SELECTOR );
	}

	setThousandSeparator( separator ) {
		return helper.setWhenSettable( this.driver, THOUSAND_SEPARATOR_SELECTOR, separator );
	}

	setDecimalSeparator( separator ) {
		return helper.setWhenSettable( this.driver, DECIMAL_SEPARATOR_SELECTOR, separator );
	}

	setNumberOfDecimals( num ) {
		return helper.setWhenSettable( this.driver, NUMBER_OF_DECIMALS_SELECTOR, num );
	}
}
