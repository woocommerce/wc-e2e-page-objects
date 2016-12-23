/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import * as wcHelper from '../../helper';

const METABOX_SELECTOR = By.css( '#woocommerce-order-notes' );
const ADD_NOTE_BUTTON_SELECTOR = By.css( 'a.add_note' );
const NOTE_TEXTAREA_SELECTOR = By.css( '#add_order_note' );
const NOTE_TYPE_SELECTOR = By.css( '#order_note_type' );

export default class ComponentMetaBoxOrderNotes extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	hasNote( note ) {
		const selector = By.xpath(
			'//div[@id="woocommerce-order-notes"]' +
			`//div[contains(@class, "note_content") and contains(.,"${ note }")]`
		);
		return helper.isEventuallyPresentAndDisplayed( this.driver, selector );
	}

	addNote( note, type = 'Private note' ) {
		this.setNote( note );
		this.selectNoteType( type );
		return this.clickAdd();
	}

	setNote( note ) {
		return helper.setWhenSettable( this.driver, NOTE_TEXTAREA_SELECTOR, note );
	}

	selectNoteType( option ) {
		return wcHelper.selectOption( this.driver, NOTE_TYPE_SELECTOR, option );
	}

	clickAdd() {
		return helper.clickWhenClickable( this.driver, ADD_NOTE_BUTTON_SELECTOR );
	}

	deleteNote( note ) {
		const selector = By.xpath(
			'//li[contains(@class, "note") .' +
			`//div[contains(@class, "note_content") and contains(.,"${ note }")]]` +
			'//a[contains(@class, "delete_note")]'
		);
		helper.clickWhenClickable( this.driver, selector );
		wcHelper.waitTillAlertAccepted( this.driver );
		return wcHelper.waitTillUIBlockNotPresent( this.driver );
	}
}
