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

const SHOP_PAGE_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_shop_page_id' );
const REDIRECT_TO_THE_CART_PAGE_AFTER_SUCCESSFUL_ADDITION_SELECTOR = By.css( '#woocommerce_cart_redirect_after_add' );
const ENABLE_AJAX_ADD_TO_CART_BUTTONS_ON_ARCHIVES_SELECTOR = By.css( '#woocommerce_enable_ajax_add_to_cart' );
const WEIGHT_UNIT_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_weight_unit' );
const DIMENSIONS_UNIT_SELECTOR = wcHelper.getSelect2ToggleSelectorByName( 'woocommerce_dimension_unit' );
const ENABLE_PRODUCT_REVIEWS_SELECTOR = By.css( '#woocommerce_enable_reviews' );
const REVIEW_RATING_VERIFICATION_LABEL_SELECTOR = By.css( '#woocommerce_review_rating_verification_label' );
const REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR = By.css( '#woocommerce_review_rating_verification_required' );
const ENABLE_REVIEW_RATING_SELECTOR = By.css( '#woocommerce_enable_review_rating' );
const REVIEW_RATING_REQUIRED_SELECTOR = By.css( '#woocommerce_review_rating_required' );

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
	 * Select the shop page.
	 *
	 * @param  {string}    option - Shop page text.
	 * @return {Promise}   Promise that evaluates to `true` if weight unit selected successfully, `false` otherwise.
	 */
	selectShopPage( option ) {
		return wcHelper.select2Option( this.driver, SHOP_PAGE_SELECTOR, option );
	}

	/**
	 * Check the "Redirect to the cart page after successful addition" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkRedirectToTheCartAfterSuccessfulAddition() {
		helper.unsetCheckbox( this.driver, REDIRECT_TO_THE_CART_PAGE_AFTER_SUCCESSFUL_ADDITION_SELECTOR );
		return helper.setCheckbox( this.driver, REDIRECT_TO_THE_CART_PAGE_AFTER_SUCCESSFUL_ADDITION_SELECTOR );
	}

	/**
	 * Uncheck the "Redirect to the cart page after successful addition" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckRedirectToTheCartAfterSuccessfulAddition() {
		helper.setCheckbox( this.driver, REDIRECT_TO_THE_CART_PAGE_AFTER_SUCCESSFUL_ADDITION_SELECTOR );
		return helper.unsetCheckbox( this.driver, REDIRECT_TO_THE_CART_PAGE_AFTER_SUCCESSFUL_ADDITION_SELECTOR );
	}

	/**
	 * Check the "Enable AJAX add to cart buttons on archives" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableAjaxAddToCartButtonsOnArchives() {
		helper.unsetCheckbox( this.driver, ENABLE_AJAX_ADD_TO_CART_BUTTONS_ON_ARCHIVES_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_AJAX_ADD_TO_CART_BUTTONS_ON_ARCHIVES_SELECTOR );
	}

	/**
	 * Uncheck the "Enable AJAX add to cart buttons on archives" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableAjaxAddToCartButtonsOnArchives() {
		helper.setCheckbox( this.driver, ENABLE_AJAX_ADD_TO_CART_BUTTONS_ON_ARCHIVES_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_AJAX_ADD_TO_CART_BUTTONS_ON_ARCHIVES_SELECTOR );
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
	 * Check the "Enable product reviews" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableProductReviews() {
		helper.unsetCheckbox( this.driver, ENABLE_PRODUCT_REVIEWS_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_PRODUCT_REVIEWS_SELECTOR );
	}

	/**
	 * Uncheck the "Enable product reviews" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableProductReviews() {
		helper.setCheckbox( this.driver, ENABLE_PRODUCT_REVIEWS_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_PRODUCT_REVIEWS_SELECTOR );
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
	* Check the "Reviews can only be left by 'verified owners'" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	*/
	checkOnlyAllowReviewsFromVerifiedOwners() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}

	/**
	* Uncheck the "Reviews can only be left by 'verified owners'" checkbox.
	*
 	* @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	*/
	uncheckOnlyAllowReviewsFromVerifiedOwners() {
		helper.setCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_VERIFICATION_REQUIRED_SELECTOR );
	}

	/**
	 * Check the "Enable star rating on reviews" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkEnableRatingsOnReviews() {
		helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	/**
	 * Uncheck the "Enable star rating on reviews" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckEnableRatingsOnReviews() {
		helper.setCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
		return helper.unsetCheckbox( this.driver, ENABLE_REVIEW_RATING_SELECTOR );
	}

	/**
	 * Check the "Star ratings should be required, not optional" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets checked successfully, `false` otherwise.
	 */
	checkRatingsAreRequiredToLeaveReview() {
		helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}

	/**
	 * Uncheck the "Star ratings should be required, not optional" checkbox.
	 *
	 * @return {Promise}   Promise that evaluates to `true` if box is/gets unchecked successfully, `false` otherwise.
	 */
	uncheckRatingsAreRequiredToLeaveReview() {
		helper.setCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
		return helper.unsetCheckbox( this.driver, REVIEW_RATING_REQUIRED_SELECTOR );
	}
}
