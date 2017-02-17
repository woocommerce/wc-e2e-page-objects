/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentProductDataPanelGeneral from './component-product-data-panel-general';
import ComponentProductDataPanelInventory from './component-product-data-panel-inventory';
import ComponentProductDataPanelShipping from './component-product-data-panel-shipping';
import ComponentProductDataPanelAttributes from './component-product-data-panel-attributes';
import ComponentProductDataPanelVariations from './component-product-data-panel-variations';

const METABOX_SELECTOR = By.css( '#woocommerce-product-data' );
const PRODUCT_TYPE_SELECTOR = By.css( '#product-type' );
const VIRTUAL_CHECKBOX_SELECTOR = By.css( '#_virtual' );
const DOWNLOADABLE_CHECKBOX_SELECTOR = By.css( '#_downloadable' );

export default class ComponentMetaBoxProductData extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );

		this.panels = {};
		this.setTabPanel( 'General', ComponentProductDataPanelGeneral );
		this.setTabPanel( 'Inventory', ComponentProductDataPanelInventory );
		this.setTabPanel( 'Shipping', ComponentProductDataPanelShipping );
		this.setTabPanel( 'Advanced', ComponentProductDataPanelShipping );
		this.setTabPanel( 'Attributes', ComponentProductDataPanelAttributes );
		this.setTabPanel( 'Variations', ComponentProductDataPanelVariations );
	}

	selectProductType( type ) {
		return helper.selectOption( this.driver, PRODUCT_TYPE_SELECTOR, type );
	}

	checkVirtual() {
		return helper.setCheckbox( this.driver, VIRTUAL_CHECKBOX_SELECTOR );
	}

	uncheckVirtual() {
		return helper.unsetCheckbox( this.driver, VIRTUAL_CHECKBOX_SELECTOR );
	}

	checkDownloadable() {
		return helper.setCheckbox( this.driver, DOWNLOADABLE_CHECKBOX_SELECTOR );
	}

	uncheckDownloadable() {
		return helper.unsetCheckbox( this.driver, DOWNLOADABLE_CHECKBOX_SELECTOR );
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
		return By.xpath( `//ul[contains(@class,"product_data_tabs")]//${ li }/a[contains(., "${ tab }")]` );
	}
}
