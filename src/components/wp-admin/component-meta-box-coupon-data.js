/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentCouponDataPanelGeneral from './component-coupon-data-panel-general';
import ComponentCouponDataPanelUsageRestriction from './component-coupon-data-panel-usage-restriction';
import ComponentCouponDataPanelUsageLimits from './component-coupon-data-panel-usage-limits';

const METABOX_SELECTOR = By.css( '#woocommerce-coupon-data' );

export default class ComponentMetaBoxCouponData extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );

		this.panels = {};
		this.setTabPanel( 'General', ComponentCouponDataPanelGeneral );
		this.setTabPanel( 'Usage Restriction', ComponentCouponDataPanelUsageRestriction );
		this.setTabPanel( 'Usage Limits', ComponentCouponDataPanelUsageLimits );
	}

	hasTabActive( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab, { active: true } ) );
	}

	hasTab( tab ) {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this._getTabSelector( tab ) );
	}

	clickTab( tab ) {
		helper.clickWhenClickable( this.driver, this._getTabSelector( tab ) );
		if ( 'undefined' === typeof this.panels[ tab ] ) {
			throw new Error( 'Missing panel for this class' );
		}

		const panel = new this.panels[ tab ]( this.driver );
		panel.displayed();

		return panel;
	}

	setTabPanel( tab, panelClass ) {
		this.panels[ tab ] = panelClass;
	}

	_getTabSelector( tab, args = { active: false } ) {
		const li = args.active ? 'li[contains(@class, "active")]' : 'li';
		return By.xpath( `//ul[contains(@class,"coupon_data_tabs")]//${ li }/a[contains(., "${ tab }")]` );
	}
}
