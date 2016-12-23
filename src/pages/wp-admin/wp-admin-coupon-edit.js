/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ComponentMetaBoxCouponData from '../../components/wp-admin/component-meta-box-coupon-data';

const DESCRIPTION_SELECTOR = By.css( '#woocommerce-coupon-description' );

export default class WPAdminCouponEdit extends WPAdminPostEdit {
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				components: {
					metaBoxCouponData: ComponentMetaBoxCouponData
				}
			},
			args
		);
		super( driver, args );
	}

	setDescription( description ) {
		return helper.setWhenSettable( this.driver, DESCRIPTION_SELECTOR, description );
	}
}
