/**
 * @module WPAdminWCSettingsProductsGeneral
 */

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

/**
 * The Products: General settings screen
 *
 * @extends WPAdminWCSettings
 */
export default class WPAdminWCSettingsProductsGeneral extends WPAdminWCSettings {
	/**
 	* @param {WebDriver} driver   - Instance of WebDriver.
 	* @param {object}    args     - Configuration arguments.
	*/
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	/**
	* Select the weight unit.
	*
 	* @param  {string}    option - Weight unit text.
 	* @return {Promise}   Promise that evaluates to `true` if weight unit selected successfully, `false` otherwise.
	*/
	selectWeightUnit( option ) {
		return wcHelper.select2Option( this.driver, WEIGHT_UNIT_SELECTOR, option );
	}

	/**
	* Select the dimensions unit.
	*
 	* @param  {string}    option - Dimensions unit text.
 	* @return {Promise}   Promise that evaluates to `true` if dimensions unit selected successfully, `false` otherwise.
	*/
	selectDimensionsUnit( option ) {
		return wcHelper.select2Option( this.driver, DIMENSIONS_UNIT_SELECTOR, option );
	}

	/**
	* Check the "Enable ratings on reviews" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkEnableRatingsOnReviews() {
		helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	/**
	* Uncheck the "Enable ratings on reviews" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckEnableRatingsOnReviews() {
		helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	/**
	* Check the "Ratings are required to leave a review" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkRatingsAreRequiredToLeaveReview() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}

	/**
	* Uncheck the "Ratings are required to leave a review" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckRatingsAreRequiredToLeaveReview() {
		helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}

	/**
	* Check the "Show 'verified owner' label for customer reviews" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkShowVerifiedOwnerLabel() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
	}

	/**
	* Uncheck the "Show 'verified owner' label for customer reviews" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckShowVerifiedOwnerLabel() {
		helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_LABEL_SELECTOR );
	}

	/**
	* Check the "Only allow reviews from 'verified owners'" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkOnlyAllowReviewsFromVerifiedOwners() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}

	/**
	* Uncheck the "Only allow reviews from 'verified owners'" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckOnlyAllowReviewsFromVerifiedOwners() {
		helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}
}
