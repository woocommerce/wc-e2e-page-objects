/**
 * @module WPAdminWCSettingsTaxRates
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import WPAdminWCSettings from './wp-admin-wc-settings';

const INSERT_ROW_SELECTOR = By.css( '.button.insert' );
const REMOVE_SELECTED_ROWS_SELECTOR = By.css( '.button.remove_tax_rates' );

const defaultArgs = {
	url: '',
	visit: true,
};

/**
 * A Tax: Standard/other rates settings screen.
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsTaxRates extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Set the Country Code field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - Country code.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setCountryCode( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.wc_input_country_iso' ), value );
	}

	/**
	* Set the State Code field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - State code.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setStateCode( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.state input' ), value );
	}

	/**
	* Set the Postcode/Zip field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - Zip or postal code.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setZipCode( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.postcode input' ), value );
	}

	/**
	* Set the City field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - City.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setCity( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.city input' ), value );
	}

	/**
	* Set the Rate % field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - Rate %.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setRate( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.rate input' ), value );
	}

	/**
	* Set the Tax Name field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - Tax name.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setTaxName( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.name input' ), value );
	}

	/**
	* Set the Priority field.
	*
	* @param  {int}       row - Row number to set field for.
 	* @param  {string}    value - Priority.
 	* @return {Promise}   Promise that evaluates to `true` if set successfully, `false` otherwise.
	*/
	setPriority( row, value ) {
		return helper.setWhenSettable( this.driver, this.getSelector( row, '.priority input' ), value );
	}

	/**
	* Check the "Compound" checkbox.
	*
	* @param  {int}       row - Row number of checkbox.
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkCompound( row ) {
		const selector = this.getSelector( row, '.compound input' );
		helper.unsetCheckbox( this.driver, selector );
		return helper.setCheckbox( this.driver, selector );
	}

	/**
	* Uncheck the "Compound" checkbox.
	*
	* @param  {int}       row - Row number of checkbox.
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckCompound( row ) {
		const selector = this.getSelector( row, '.compound input' );
		helper.setCheckbox( this.driver, selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	/**
	* Check the "Shipping" checkbox.
	*
	* @param  {int}       row - Row number of checkbox.
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkShipping( row ) {
		const selector = this.getSelector( row, '.apply_to_shipping input' );
		helper.unsetCheckbox( this.driver, selector );
		return helper.setCheckbox( this.driver, selector );
	}

	/**
	* Uncheck the "Compound" checkbox.
	*
	* @param  {int}       row - Row number of checkbox.
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckShipping( row ) {
		const selector = this.getSelector( row, '.apply_to_shipping input' );
		helper.setCheckbox( this.driver, selector );
		return helper.unsetCheckbox( this.driver, selector );
	}

	/**
	* Click the "Insert Row" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button gets clicked successfully, `false` otherwise.
	*/
	insertRow() {
		return helper.clickWhenClickable( this.driver, INSERT_ROW_SELECTOR );
	}

	/**
	* Click the "Remove Selected Row(s)" button.
	*
 	* @return {Promise}   Promise that evaluates to `true` if button gets clicked successfully, `false` otherwise.
	*/
	removeSelectedRows() {
		return helper.clickWhenClickable( this.driver, REMOVE_SELECTED_ROWS_SELECTOR );
	}

	/**
	* Remove a row.
	*
	* @param  {int}       row - Row number to remove.
 	* @return {Promise}   Promise that evaluates to `true` if row removed successfully using UI, `false` otherwise.
	*/
	removeRow( row ) {
		return helper.clickWhenClickable( this.driver, this.getSelector( row, '.wc_input_country_iso' ) ).then(
			() => {
				return this.removeSelectedRows();
			}
		);
	}

	/**
	 * Get the selector for an element in the tax rate form.
	 *
	 * @param  {int}       row - Row number element is in.
	 * @param  {string}    childEl - An optional CSS selector to look for inside the row. Default: ''
	 * @return {object}    selector
	 */
	getSelector( row, childEl = '' ) {
		return By.css( `#rates tr:nth-child(${ row }) ${ childEl }` );
	}
}
