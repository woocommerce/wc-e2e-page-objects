/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import * as wcHelper from '../helper.js';
import ComponentCheckout from './component-checkout';

const SELECTOR = '.woocommerce-shipping-fields';
const FIRST_NAME_SELECTOR = By.css( '#shipping_first_name' );
const LAST_NAME_SELECTOR = By.css( '#shipping_last_name' );
const COMPANY_SELECTOR = By.css( '#shipping_company' );
const COUNTRY_SELECTOR = By.css( '#shipping_country_field .select2-selection__arrow' );
const ADDRESS_1_SELECTOR = By.css( '#shipping_address_1' );
const ADDRESS_2_SELECTOR = By.css( '#shipping_address_2' );
const CITY_SELECTOR = By.css( '#shipping_city' );
const STATE_SELECTOR = By.css( '#shipping_state_field .select2-selection__arrow' );
const ZIP_SELECTOR = By.css( '#shipping_postcode' );

export default class ComponentCheckoutShippingDetails extends ComponentCheckout {
	constructor( driver ) {
		super( driver, SELECTOR );
	}

	setFirstName( firstName ) {
		helper.mouseMoveTo( this.driver, FIRST_NAME_SELECTOR );
		return helper.setWhenSettable( this.driver, FIRST_NAME_SELECTOR, firstName );
	}

	setLastName( lastName ) {
		helper.mouseMoveTo( this.driver, LAST_NAME_SELECTOR );
		return helper.setWhenSettable( this.driver, LAST_NAME_SELECTOR, lastName );
	}

	setCompany( company ) {
		helper.mouseMoveTo( this.driver, COMPANY_SELECTOR );
		return helper.setWhenSettable( this.driver, COMPANY_SELECTOR, company );
	}

	selectCountry( keyword, option ) {
		helper.mouseMoveTo( this.driver, COUNTRY_SELECTOR );
		return wcHelper.select2OptionWithSearch( this.driver, COUNTRY_SELECTOR, keyword, option );
	}

	setAddress1( addr ) {
		helper.mouseMoveTo( this.driver, ADDRESS_1_SELECTOR );
		return helper.setWhenSettable( this.driver, ADDRESS_1_SELECTOR, addr );
	}

	setAddress2( addr ) {
		helper.mouseMoveTo( this.driver, ADDRESS_2_SELECTOR );
		return helper.setWhenSettable( this.driver, ADDRESS_2_SELECTOR, addr );
	}

	setCity( city ) {
		helper.mouseMoveTo( this.driver, CITY_SELECTOR );
		return helper.setWhenSettable( this.driver, CITY_SELECTOR, city );
	}

	selectState( keyword, option ) {
		helper.mouseMoveTo( this.driver, STATE_SELECTOR );
		return wcHelper.select2OptionWithSearch( this.driver, STATE_SELECTOR, keyword, option );
	}

	setZip( zip ) {
		helper.mouseMoveTo( this.driver, ZIP_SELECTOR );
		return helper.setWhenSettable( this.driver, ZIP_SELECTOR, zip );
	}
}
