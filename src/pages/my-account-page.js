/**
 * External dependencies
 */
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
		menu: ComponentMyAccountMenu
	}
};

export default class MyAccountPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );

		helper.clearCookiesAndDeleteLocalStorage( driver );
	}

	login( username, password ) {
		this.components.loginForm.fillUsername( username );
		this.components.loginForm.fillPassword( password );
		this.components.loginForm.submit();

		return this;
	}

	hasMenu( menu ) {
		return this.components.menu.hasMenu( menu );
	}

	clickMenu( menu ) {
		return this.components.menu.click( menu );
	}
}
