/**
 * @module WPAdminCouponEdit
 */

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';
import { WPAdminPostEdit } from 'wp-e2e-page-objects';

const TITLE_SELECTOR = By.css( '#title' );
const PUBLISH_SELECTOR = By.css( '#publish' );
const TRASH_SELECTOR = By.css( '.submitdelete' );

/**
 * The admin Edit page that uses the classic editor
 *
 * @extends WPAdminPostEdit
 */
export default class WPAdminClassicPostEdit extends WPAdminPostEdit {
	/**
	* Publish post.
	*
 	* @return {Promise}   Promise that evaluates to `true` if post was published, `false` otherwise.
	*/
	publish() {
		return helper.clickWhenClickable( this.driver, PUBLISH_SELECTOR );
	}

	/**
	* Trash post.
	*
 	* @return {Promise}   Promise that evaluates to `true` if post was moved to trash, `false` otherwise.
	*/
	moveToTrash() {
		return helper.clickWhenClickable( this.driver, TRASH_SELECTOR );
	}

	/**
	* Set the post title.
	*
 	* @param  {string}    title  - Text to enter in the title field.
 	* @return {Promise}   Promise that evaluates to `true` if title set successfully, `false` otherwise.
	*/
	setTitle( title ) {
		return helper.setWhenSettable( this.driver, TITLE_SELECTOR, title );
	}
}
