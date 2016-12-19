/**
 * External dependencies
 */
import { By, Key } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

const UI_BLOCK_SELECTOR = By.css( '.blockUI.blockOverlay' );

export function waitTillUIBlockPresent( driver, waitMs = 10000 ) {
	return helper.waitTillPresentAndDisplayed( driver, UI_BLOCK_SELECTOR, waitMs );
}

export function waitTillUIBlockNotPresent( driver, waitMs = 10000 ) {
	return helper.waitTillNotPresent( driver, UI_BLOCK_SELECTOR, waitMs );
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

export function scrollUp( driver, waitMsToScroll = 2000 ) {
	driver.actions().
		sendKeys( Key.PAGE_UP ).
		perform();

	driver.sleep( waitMsToScroll );
}

export function mouseMoveTo( driver, selector ) {
	return driver.actions().
		mouseMove( driver.findElement( selector ) ).
		perform().then( () => {
			return true;
		}, () => {
			return false;
		} );
}

export function scrollDown( driver, waitMsToScroll = 2000 ) {
	driver.actions().
		sendKeys( Key.PAGE_DOWN ).
		perform();

	driver.sleep( waitMsToScroll );
}

export function select2Option( driver, selector, option ) {
	helper.clickWhenClickable( driver, selector );

	const optionSelector = By.xpath( `//div[contains(@class, "select2-result-label") and contains(text(), "${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}

export function select2OptionWithSearch( driver, selector, keyword, option ) {
	helper.waitTillPresentAndDisplayed( driver, selector );
	helper.clickWhenClickable( driver, selector );

	// Wait till search results visible before typing the keyword.
	helper.waitTillPresentAndDisplayed( driver, By.css( '.select2-results' ) );

	const searchSelector = By.css( 'input.select2-input.select2-focused' );
	helper.setWhenSettable( driver, searchSelector, keyword );

	const optionSelector = By.xpath( `//div[contains(@class, "select2-result-label") and contains(.,"${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}

export function setSelect2WithSearch( driver, selector, keyword, option ) {
	helper.waitTillPresentAndDisplayed( driver, selector );
	helper.clickWhenClickable( driver, selector );

	// Wait till search results visible before typing the keyword.
	helper.waitTillPresentAndDisplayed( driver, By.css( '.select2-results' ) );

	const searchSelector = By.css( 'input.select2-input.select2-focused' );
	helper.setWhenSettable( driver, searchSelector, keyword );

	const optionSelector = By.xpath( `//div[contains(@class, "select2-result-label") and contains(.,"${ option }")]` );
	return helper.clickWhenClickable( driver, optionSelector );
}
