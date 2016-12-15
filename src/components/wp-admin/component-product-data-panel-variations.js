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
import ComponentProductDataVariationRow from './component-product-data-variation-row';

const PANEL_SELECTOR = By.css( '#product_attributes' );
const ACTION_SELECTOR = By.css( '#field_to_edit.variation_actions' );
const GO_SELECTOR = By.css( '.do_variation_action' );
const SAVE_CHANGES_SELECTOR = By.css( 'button.save-variation-changes' );

export default class ComponentProductDataPanelVariations extends Component {
	constructor( driver ) {
		super( driver, PANEL_SELECTOR, { wait: false } );

		this.currentAction = 'Add variation';
	}

	selectAction( action ) {
		wcHelper.waitTillUIBlockNotPresent( this.driver );

		this.currentAction = action;
		helper.selectOption( this.driver, ACTION_SELECTOR, action );
	}

	go() {
		wcHelper.waitTillUIBlockNotPresent( this.driver );

		helper.clickWhenClickable( this.driver, GO_SELECTOR );

		switch ( this.currentAction ) {
			case 'Create variations from all attributes':
				wcHelper.waitTillAlertAccepted( this.driver );
				wcHelper.waitTillAlertAccepted( this.driver );
				break;
		}

		wcHelper.waitTillUIBlockNotPresent( this.driver );
	}

	getRow( row ) {
		return new ComponentProductDataVariationRow( this.driver, this._getVariationRowSelector( row ) );
	}

	saveChanges() {
		return helper.clickWhenClickable( this.driver, SAVE_CHANGES_SELECTOR );
	}

	_getVariationRowSelector( row ) {
		let selector;
		switch ( row ) {
			case 'first':
				selector = By.css( '.woocommerce_variations .woocommerce_variation:first-child' );
				break;
			case 'last':
				selector = By.css( '.woocommerce_variations .woocommerce_variation:last-child' );
				break;
			default:
				row = parseInt( row, 10 );
				selector = By.css( `.woocommerce_variations .woocommerce_variation:nth-child(${ row })` );
		}

		return selector;
	}
}
