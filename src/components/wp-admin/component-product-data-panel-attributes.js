/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import * as wcHelper from '../../helper';
import ComponentProductDataAttributeRow from './component-product-data-attribute-row';

const PANEL_SELECTOR = By.css( '#product_attributes' );
const ATTRIBUTE_TAXONOMY_SELECTOR = By.css( 'select[name="attribute_taxonomy"]' );
const ADD_SELECTOR = By.css( 'button.add_attribute' );
const SAVE_ATTRIBUTES_SELECTOR = By.css( 'button.save_attributes' );

export default class ComponentProductDataPanelAttributes extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );
	}

	selectAttribute( option ) {
		return helper.selectOption( this.driver, ATTRIBUTE_TAXONOMY_SELECTOR, option );
	}

	add() {
		helper.clickWhenClickable( this.driver, ADD_SELECTOR );

		// This perform add attribute via AJAX that block the panel.
		wcHelper.waitTillUIBlockNotPresent( this.driver );

		return this.getRow( 'last' );
	}

	getRow( row ) {
		return new ComponentProductDataAttributeRow( this.driver, this._getAttributeRowSelector( row ) );
	}

	saveAttributes() {
		helper.clickWhenClickable( this.driver, SAVE_ATTRIBUTES_SELECTOR );

		// Once clicked two AJAX calls are performed sequentially: save attributes
		// then load variations. UI blocking is performed twice per AJAX call.
		wcHelper.waitTillUIBlockNotPresent( this.driver );
	}

	_getAttributeRowSelector( row ) {
		let selector;
		switch ( row ) {
			case 'first':
				selector = By.css( '.product_attributes .woocommerce_attribute:first-child' );
				break;
			case 'last':
				selector = By.css( '.product_attributes .woocommerce_attribute:last-child' );
				break;
			default:
				row = parseInt( row, 10 );
				selector = By.css( `.product_attributes .woocommerce_attribute:nth-child(${ row })` );
		}

		return selector;
	}
}
