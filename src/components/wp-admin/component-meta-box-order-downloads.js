/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { ComponentMetaBox } from 'wp-e2e-page-objects';

const METABOX_SELECTOR = By.css( '#woocommerce-order-downloads' );

export default class ComponentMetaBoxOrderDownloads extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}
}
