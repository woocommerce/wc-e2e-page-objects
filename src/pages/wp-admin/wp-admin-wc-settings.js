/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPAdminSettings } from 'wp-e2e-page-objects';

export default class WPAdminWCSettings extends WPAdminSettings {
	constructor( driver, args = {} ) {
		super( driver, args );
	}

	hasTab( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab ) );
	}

	hasSubTab( subTab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getSubTabSelector( subTab ) );
	}

	hasActiveTab( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab, { active: true } ) );
	}

	hasActiveSubTab( subTab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getSubTabSelector( subTab, { active: true } ) );
	}

	clickTab( tab ) {
		return helper.clickWhenClickable( this.driver, this._getTabSelector( tab ) );
	}

	clickSubTab( subTab ) {
		return helper.clickWhenClickable( this.driver, this._getSubTabSelector( subTab ) );
	}

	_getTabSelector( tab, { active = false } ) {
		let exp = `//nav[contains(@class, "woo-nav-tab-wrapper")]//a[contains(@class, "nav-tab") and contains(text(), ${ tab })]`;
		if ( active ) {
			exp = `//nav[contains(@class, "woo-nav-tab-wrapper")]//a[contains(@class, "nav-tab-active") and contains(text(), ${ tab })]`;
		}

		return By.xpath( exp );
	}

	_getSubTabSelector( subTab, { active = false } ) {
		let exp = `//ul[contains(@class, "subsubsub")]/li/a[contains(text(), ${ subTab })]`;
		if ( active ) {
			exp = `//ul[contains(@class, "subsubsub")]/li/a[contains(@class, "current") and contains(text(), "${ subTab }")]`;
		}

		return By.xpath( exp );
	}
}
