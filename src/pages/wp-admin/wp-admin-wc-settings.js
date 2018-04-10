/**
 * @module WPAdminWCSettings
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPAdminSettings } from 'wp-e2e-page-objects';

const SAVE_CHANGES_SELECTOR = By.css( '.submit [type="submit"]' );

/**
 * A WooCommerce admin Settings screen
 *
 * @extends WPAdminSettings
 */
export default class WPAdminWCSettings extends WPAdminSettings {
	/**
	 * @param {WebDriver} driver   - Instance of WebDriver.
	 * @param {object}    args     - Configuration arguments.
	 */
	constructor( driver, args = {} ) {
		super( driver, args );
	}

	/**
	 * Check whether a settings tab is present.
	 *
	 * @param  {string}    tab - Text in the tab.
	 * @return {Promise}   Promise that evaluates to `true` if tab is present and displayed, `false` otherwise.
	 */
	hasTab( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab ) );
	}

	/**
	 * Check whether a settings sub-tab is present.
	 *
	 * @param  {string}    subTab - Text in the sub-tab.
	 * @return {Promise}   Promise that evaluates to `true` if sub-tab is present and displayed, `false` otherwise.
	 */
	hasSubTab( subTab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getSubTabSelector( subTab, { active: false } ) );
	}

	/**
	 * Check whether a settings tab is the current tab.
	 *
	 * @param  {string}    tab - Text in the tab.
	 * @return {Promise}   Promise that evaluates to `true` if tab is active, `false` otherwise.
	 */
	hasActiveTab( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab, { active: true } ) );
	}

	/**
	 * Check whether a settings sub-tab is the current sub-tab.
	 *
	 * @param  {string}    subTab - Text in the sub-tab.
	 * @return {Promise}   Promise that evaluates to `true` if sub-tab is active, `false` otherwise.
	 */
	hasActiveSubTab( subTab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getSubTabSelector( subTab, { active: true } ) );
	}

	/**
	 * Click a settings tab.
	 *
	 * @param  {string}    tab - Text in the tab.
	 * @return {Promise}   Promise that evaluates to `true` if tab is successfully clicked, `false` otherwise.
	 */
	clickTab( tab ) {
		return helper.clickWhenClickable( this.driver, this._getTabSelector( tab ) );
	}

	/**
	 * Click a settings sub-tab.
	 *
	 * @param  {string}    subTab - Text in the sub-tab.
	 * @return {Promise}   Promise that evaluates to `true` if sub-tab is successfully clicked, `false` otherwise.
	 */
	clickSubTab( subTab ) {
		return helper.clickWhenClickable( this.driver, this._getSubTabSelector( subTab ) );
	}

	/**
	 * Get the tab selector for a settings tab (Internal use only).
	 *
	 * @param  {string}    tab - Text in the tab.
	 * @param  {object}    args - Options. Default { active = false }.
	 * @return {object}    Selector object.
	 */
	_getTabSelector( tab, { active = false } ) {
		let exp = `//nav[contains(@class, "woo-nav-tab-wrapper")]//a[contains(@class, "nav-tab") and contains(text(), ${ tab })]`;
		if ( active ) {
			exp = `//nav[contains(@class, "woo-nav-tab-wrapper")]//a[contains(@class, "nav-tab-active") and contains(text(), ${ tab })]`;
		}

		return By.xpath( exp );
	}

	/**
	 * Get the sub-tab selector for a settings sub-tab (Internal use only).
	 *
	 * @param  {string}    subTab - Text in the sub-tab.
	 * @param  {object}    args - Options. Default { active = false }.
	 * @return {object}    Selector object.
	 */
	_getSubTabSelector( subTab, { active = false } ) {
		let exp = `//ul[contains(@class, "subsubsub")]/li/a[contains(text(), "${ subTab }")]`;
		if ( active ) {
			exp = `//ul[contains(@class, "subsubsub")]/li/a[contains(@class, "current") and contains(text(), "${ subTab }")]`;
		}
		return By.xpath( exp );
	}

	/**
	 * Click save changes button.
	 *
	 * @return {Promise} Promise that evaluates to `true` if save change button is successfully clicked, `false` otherwise.
	 */
	saveChanges() {
		helper.mouseMoveTo( this.driver, SAVE_CHANGES_SELECTOR );
		return helper.clickWhenClickable( this.driver, SAVE_CHANGES_SELECTOR );
	}
}
