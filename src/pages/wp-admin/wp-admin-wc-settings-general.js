/**
 * @module WPAdminWCSettingsGeneral
 */

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

const BASE_LOCATION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_default_country' );
const SELLING_LOCATION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_allowed_countries' );
const SELL_TO_SPECIFIC_COUNTRIES_SELECTOR = wcHelper.getSelect2ToggleSelectorByName(
	'woocommerce_specific_allowed_countries[]', { multiple: true }
);
const ENABLE_TAXES_SELECTOR = By.css( '#woocommerce_calc_taxes' );
const STORE_NOTICE_SELECTOR = By.css( '#woocommerce_demo_store' );
const CURRENCY_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_currency' );
const CURRENCY_POSITION_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_currency_pos' );
const THOUSAND_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_thousand_sep' );
const DECIMAL_SEPARATOR_SELECTOR = By.css( '#woocommerce_price_decimal_sep' );
const NUMBER_OF_DECIMALS_SELECTOR = By.css( '#woocommerce_price_num_decimals' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * The General admin settings screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsGeneral extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Select the base location.
	*
 	* @param  {string}    keyword      - Text to enter in the search field.
 	* @param  {string}    exactOption  - Text of option to select.
 	* @return {Promise}   Promise that evaluates to `true` if base location selected successfully, `false` otherwise.
	*/
	selectBaseLocation( keyword, exactOption ) {
		return wcHelper.select2OptionWithSearch( this.driver, BASE_LOCATION_SELECTOR, keyword, exactOption );
	}

	/**
	* Select the selling location preferences.
	*
 	* @param  {string}    option  - Text of option to select.
 	* @return {Promise}   Promise that evaluates to `true` if selling location preferences selected successfully, `false` otherwise.
	*/
	selectSellingLocation( option ) {
		return wcHelper.select2Option( this.driver, SELLING_LOCATION_SELECTOR, option );
	}

	/**
	* Select a country to use for a selling location.
	*
 	* @param  {string}    keyword      - Text to enter in the search field.
 	* @param  {string}    exactOption  - Text of option to select.
 	* @return {Promise}   Promise that evaluates to `true` if specified country selected successfully, `false` otherwise.
	*/
	setSellToSpecificCountries( keyword, exactOption ) {
		return wcHelper.setSelect2WithSearch( this.driver, SELL_TO_SPECIFIC_COUNTRIES_SELECTOR, keyword, exactOption );
	}

	/**
	* Unset a country from the selling locations.
	*
 	* @param  {string}    choice  - Text of option to select.
 	* @return {Promise}   Promise that evaluates to `true` if specified country is/gets unselected, `false` otherwise.
	*/
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

	/**
	* Check the "Enable taxes" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkEnableTaxes() {
		helper.unsetCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
	}

	/**
	* Uncheck the "Enable taxes" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckEnableTaxes() {
		helper.setCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_TAXES_SELECTOR );
	}

	/**
	* Check the "Store notice" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkStoreNotice() {
		helper.unsetCheckbox( this.driver, STORE_NOTICE_SELECTOR );
		return helper.setCheckbox( this.driver, STORE_NOTICE_SELECTOR );
	}

	/**
	* Uncheck the "Store notice" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	uncheckStoreNotice() {
		helper.setCheckbox( this.driver, STORE_NOTICE_SELECTOR );
		return helper.unsetCheckbox( this.driver, STORE_NOTICE_SELECTOR );
	}

	/**
	* Select a shop currency.
	*
 	* @param  {string}    keyword      - Text to enter in the search field.
 	* @param  {string}    exactOption  - Text of option to select.
 	* @return {Promise}   Promise that evaluates to `true` if specified currency selected successfully, `false` otherwise.
	*/
	selectCurrency( keyword, exactOption ) {
		return wcHelper.select2OptionWithSearch( this.driver, CURRENCY_SELECTOR, keyword, exactOption );
	}

	/**
	* Select a shop currency position.
	*
 	* @param  {string}    position     - Text of position to select.
 	* @return {Promise}   Promise that evaluates to `true` if specified currency position selected successfully, `false` otherwise.
	*/
	selectCurrencyPosition( position ) {
		return wcHelper.select2Option( this.driver, CURRENCY_POSITION_SELECTOR, position );
	}

	/**
	* Set the thousand separator input.
	*
 	* @param  {string}    separator    - What to use for the separator.
 	* @return {Promise}   Promise that evaluates to `true` if separator set successfully, `false` otherwise.
	*/
	setThousandSeparator( separator ) {
		return helper.setWhenSettable( this.driver, THOUSAND_SEPARATOR_SELECTOR, separator );
	}

	/**
	* Set the decimal separator input.
	*
 	* @param  {string}    separator    - What to use for the separator.
 	* @return {Promise}   Promise that evaluates to `true` if separator set successfully, `false` otherwise.
	*/
	setDecimalSeparator( separator ) {
		return helper.setWhenSettable( this.driver, DECIMAL_SEPARATOR_SELECTOR, separator );
	}

	/**
	* Set the number of decimals input.
	*
 	* @param  {number}    num          - Number of decimals.
 	* @return {Promise}   Promise that evaluates to `true` if number of decimals set successfully, `false` otherwise.
	*/
	setNumberOfDecimals( num ) {
		return helper.setWhenSettable( this.driver, NUMBER_OF_DECIMALS_SELECTOR, num );
	}
}
