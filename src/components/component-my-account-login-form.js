/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Component } from 'wp-e2e-page-objects';

const LOGIN_FORM_SELECTOR = By.css( '.woocommerce-form-login' );
const USERNAME_FIELD_SELECTOR = By.css( '#username' );
const PASSWORD_FIELD_SELECTOR = By.css( '#password' );
const LOGIN_BUTTON_SELECTOR = By.css( '[name="login"]' );

/**
 * My account page login form component.
 *
 * @extends Component
 */
export default class ComponentMyAccountLoginForm extends Component {
	constructor( driver, selector = LOGIN_FORM_SELECTOR ) {
		super( driver, selector );
	}

	/**
	 * Set username field.
	 *
	 * @param {string} username - Username.
	 *
	 * @return {Promise} Promise that evaluates to `true` if username field is
	 *                   set successfully, `false` otherwise.
	 */
	setUsername( username ) {
		return helper.setWhenSettable( this.driver, USERNAME_FIELD_SELECTOR, username );
	}

	/**
	 * Set password field.
	 *
	 * @param {string} password - Password.
	 *
	 * @return {Promise} Promise that evaluates to `true` if password field is
	 *                   set successfully, `false` otherwise.
	 */
	setPassword( password ) {
		return helper.setWhenSettable( this.driver, PASSWORD_FIELD_SELECTOR, password );
	}

	/**
	 * Login.
	 *
	 * @return {Promise} Promise that evaluates to `true` if login button is
	 *                   clicked successfully.
	 */
	login() {
		return helper.clickWhenClickable( this.driver, LOGIN_BUTTON_SELECTOR );
	}
}
