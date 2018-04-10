/**
 * WebDriver helper.
 *
 * @module WebDriverHelper
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

const UI_BLOCK_SELECTOR = By.css( '.blockUI.blockOverlay' );
const ANIMATION_SELECTOR = By.css( ':animated' );

/**
 * Wait until the loading spinner overlay is present.
 * Timeout occurs after `waitMs` if the overlay is not present.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {number}    waitMs   - How long to wait in milliseconds. Defaults to 1000.
 * @return {Promise}  A promise that will be resolved to `true` if/when the UI block is present,
 *                    or `false` if timeout after `waitMs` happens first.
 */
export function waitTillUIBlockPresent( driver, waitMs = 10000 ) {
	return helper.waitTillPresentAndDisplayed( driver, UI_BLOCK_SELECTOR, waitMs );
}

/**
 * Wait until the loading spinner overlay is not present.
 * Timeout occurs after `waitMs` if the UI block is still present.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {number}    waitMs   - How long to wait in milliseconds. Defaults to 1000.
 * @return {Promise}  A promise that will be resolved to `true` if/when the UI block is not present,
 *                    or `false` if timeout after `waitMs` happens first.
 */
export function waitTillUIBlockNotPresent( driver, waitMs = 10000 ) {
	return helper.waitTillNotPresent( driver, UI_BLOCK_SELECTOR, waitMs );
}

/**
 * Wait until jQuery animations are finished.
 * Timeout occurs after `waitMs` if the animation is still happening.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {number}    waitMs   - How long to wait in milliseconds. Defaults to 1000.
 * @return {Promise}  A promise that will be resolved to `true` if/when no jQuery animations are present,
 *                    or `false` if timeout after `waitMs` happens first.
 */
export function waitTillAnimationFinished( driver, waitMs = 10000 ) {
	return helper.waitTillNotPresent( driver, ANIMATION_SELECTOR, waitMs );
}

/**
 * Wait for and accept an alert.
 * Timeout occurs after `waitMs` if the alert is never present.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {number}    waitMs   - How long to wait in milliseconds. Defaults to 1000.
 * @return {Promise}  A promise that will be resolved to `true` if/when an alert happens and is successfully accepted,
 *                    or `false` if timeout after `waitMs` happens first.
 */
export function waitTillAlertAccepted( driver, waitMs = 10000 ) {
	return driver.wait( () => {
		return driver.switchTo().alert().then( ( alert ) => {
			// Mimic the human in which it takes a moment to
			// read what's in the alert.
			driver.sleep( 1000 );

			return alert.accept().then( () => {
				return true;
			} );
		}, () => {
			return false;
		} );
	}, waitMs, 'Time out waiting for alert to be accepted' );
}

/**
 * Get the selector object for a Select2 dropdown by input name.
 *
 * @param {string}    name     - Input name.
 * @param {object}    args     - Options. Valid fields:
 *                                          "multiple" - boolean - whether the input is a multiselector (default: false)
 * @return {object}   xpath selector.
 */
export function getSelect2ToggleSelectorByName( name, args ) {
	args = Object.assign(
		{
			multiple: false,
		},
		args
	);

	return args.multiple
		? By.xpath(
			`//select[@name="${ name }"]` +
			'/following-sibling::span[contains(@class, "select2")]'
		)
		: By.xpath(
			`//select[@name="${ name }"]` +
			'/following-sibling::span[contains(@class, "select2")]' +
			'//span[contains(@class,"select2-selection__arrow")]'
		);
}

/**
 * Select a select2 dropdown option.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {object}    selector - The selector for the dropdown.
 * @param {string}    option   - The text for the option to try and select.
 * @return {Promise}  A promise that will be resolved to `true` if the option is found and selected,
 *                    or `false` if unable to find and select the element.
 */
export function select2Option( driver, selector, option ) {
	helper.clickWhenClickable( driver, selector );

	const optionSelector = By.xpath( `//li[contains(@class, "select2-results__option") and contains(text(), "${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}

/**
 * Select a select2 search dropdown option.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {object}    selector - The selector for the dropdown.
 * @param {string}    keyword  - The text to type in the search field.
 * @param {string}    option   - The text for the option to try and select.
 * @return {Promise}  A promise that will be resolved to `true` if the option is found and selected,
 *                    or `false` if unable to find and select the element.
 */
export function select2OptionWithSearch( driver, selector, keyword, option ) {
	helper.waitTillPresentAndDisplayed( driver, selector );
	helper.clickWhenClickable( driver, selector );

	// Wait till search results visible before typing the keyword.
	helper.waitTillPresentAndDisplayed( driver, By.css( '.select2-results' ) );

	const searchSelector = By.css( '.select2-container--open input.select2-search__field' );
	helper.setWhenSettable( driver, searchSelector, keyword );

	const optionSelector = By.xpath( `//li[contains(@class, "select2-results__option") and contains(.,"${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}

/**
 * Select a select2 search dropdown option.
 *
 * @param {WebDriver} driver   - Instance of WebDriver.
 * @param {object}    selector - The selector for the dropdown.
 * @param {string}    keyword  - The text to type in the search field.
 * @param {string}    option   - The text for the option to try and select.
 * @return {Promise}  A promise that will be resolved to `true` if the option is found and selected,
 *                    or `false` if unable to find and select the element.
 */
export function setSelect2WithSearch( driver, selector, keyword, option ) {
	helper.waitTillPresentAndDisplayed( driver, selector );
	helper.clickWhenClickable( driver, selector );

	// Wait till search results visible before typing the keyword.
	helper.waitTillPresentAndDisplayed( driver, By.css( '.select2-results' ) );

	const searchSelector = By.css( '.select2-container--open input.select2-search__field' );
	helper.setWhenSettable( driver, searchSelector, keyword );

	const optionSelector = By.xpath( `//li[contains(@class, "select2-results__option") and contains(.,"${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}
