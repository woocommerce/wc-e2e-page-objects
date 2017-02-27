/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

const UI_BLOCK_SELECTOR = By.css( '.blockUI.blockOverlay' );
const ANIMATION_SELECTOR = By.css( ':animated' );

export function waitTillUIBlockPresent( driver, waitMs = 10000 ) {
	return helper.waitTillPresentAndDisplayed( driver, UI_BLOCK_SELECTOR, waitMs );
}

export function waitTillUIBlockNotPresent( driver, waitMs = 10000 ) {
	return helper.waitTillNotPresent( driver, UI_BLOCK_SELECTOR, waitMs );
}

export function waitTillAnimationFinished( driver, waitMs = 10000 ) {
	return helper.waitTillNotPresent( driver, ANIMATION_SELECTOR, waitMs );
}

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

export function getSelect2ToggleSelectorByName( name, args ) {
	args = Object.assign(
		{
			multiple: false
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

export function select2Option( driver, selector, option ) {
	helper.clickWhenClickable( driver, selector );

	const optionSelector = By.xpath( `//li[contains(@class, "select2-results__option") and contains(text(), "${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}

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
