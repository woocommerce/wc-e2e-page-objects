/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import * as wcHelper from '../../helper';
import WPAdminWCSettings from './wp-admin-wc-settings';

const WEIGHT_UNIT_SELECTOR = By.css( '#s2id_woocommerce_weight_unit .select2-choice b' );
const DIMENSIONS_UNIT_SELECTOR = By.css( '#s2id_woocommerce_dimension_unit .select2-choice b' );
const ENABLE_REVIEW_RATING_SELECTOR = By.css( '#woocommerce_enable_review_rating' );
const REVIEW_RATING_REQUIRED_SELECTOR = By.css( '#woocommerce_review_rating_required' );
const REVIEW_RATING_VERIFICATION_LABEL_SELECTOR = By.css( '#woocommerce_review_rating_verification_label' );
const REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR = By.css( '#woocommerce_review_rating_verification_required' );

const defaultArgs = {
	url: '',
	visit: true,
};

export default class WPAdminWCSettingsProductsGeneral extends WPAdminWCSettings {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	selectWeightUnit( option ) {
		return wcHelper.select2Option( this.driver, WEIGHT_UNIT_SELECTOR, option );
	}

	selectDimensionsUnit( option ) {
		return wcHelper.select2Option( this.driver, DIMENSIONS_UNIT_SELECTOR, option );
	}

	checkEnableRatingsOnReviews() {
		helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	uncheckEnableRatingsOnReviews() {
		helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	checkRatingsAreRequiredToLeaveReview() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}

	uncheckRatingsAreRequiredToLeaveReview() {
		helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}

	checkShowVerifiedOwnerLabel() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
	}

	uncheckShowVerifiedOwnerLabel() {
		helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
	}

	checkOnlyAllowReviewsFromVerifiedOwners() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}

	uncheckOnlyAllowReviewsFromVerifiedOwners() {
		helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}
}
