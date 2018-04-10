/**
 * @module MyAccountPage
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { Page } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMyAccountLoginForm from '../components/component-my-account-login-form';
import ComponentMyAccountMenu from '../components/component-my-account-menu';

const defaultArgs = {
	url: '',
	visit: true,
	components: {
		loginForm: ComponentMyAccountLoginForm,
		menu: ComponentMyAccountMenu,
	},
};

/**
 * The front-end My Account page
 *
 * @extends Page
 */
export default class MyAccountPage extends Page {
	/**
	 * @param {WebDriver} driver   - Instance of WebDriver.
	 * @param {object}    args     - Configuration arguments.
	 */
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );

		helper.clearCookiesAndDeleteLocalStorage( driver );
	}

	/**
	 * Log in a user using the form.
	 *
	 * @param  {string}    username - The user's username.
	 * @param  {string}    password - The user's password.
	 * @return {Promise}   Promise that evaluates to `true` if form is filled and submitted successfully, `false` otherwise.
	 */
	login( username, password ) {
		this.components.loginForm.setUsername( username );
		this.components.loginForm.setPassword( password );
		this.components.loginForm.login();

		return this;
	}

	/**
	 * Log out a user using the Logout link.
	 *
	 * @return {Promise} Promise that evaluates to `true` if form is filled and submitted successfully, `false` otherwise.
	 */
	logout() {
		this.clickMenu( 'Logout' );

		helper.waitTillPresentAndDisplayed( this.driver, By.css( '.woocommerce-message' ) );

		return this._confirmLogout();
	}

	_confirmLogout() {
		const selector = By.xpath( this._getConfirmLogoutXpathExpression() );
		return helper.clickWhenClickable( this.driver, selector );
	}

	_getConfirmLogoutXpathExpression() {
		return '//div[@class="woocommerce-message"]//a[contains(text(), "Confirm and log out")]]';
	}

	/**
	 * Check whether a menu item is present.
	 *
	 * @param  {string}    menu    - Text for the menu item.
	 * @return {Promise}   Promise that evaluates to `true` if menu item is present, `false` otherwise.
	 */
	hasMenu( menu ) {
		return this.components.menu.hasMenu( menu );
	}

	/**
	 * Click a menu item.
	 *
	 * @param  {string}    menu    - Text for the menu item.
	 * @return {Promise}   Promise that evaluates to `true` if menu item is clicked successfully, `false` otherwise.
	 */
	clickMenu( menu ) {
		return this.components.menu.click( menu );
	}
}
