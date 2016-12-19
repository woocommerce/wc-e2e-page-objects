/**
 * External dependencies
 */
import { PageMap } from 'wp-e2e-page-objects';

/**
 * Internal dependencies
 */
import ShopPage from './pages/shop-page';
import CartPage from './pages/cart-page';
import CheckoutPage from './pages/checkout-page';
import WPAdminProductEdit from './pages/wp-admin/wp-admin-product-edit';
import WPAdminProductNew from './pages/wp-admin/wp-admin-product-new';
import WPAdminProducts from './pages/wp-admin/wp-admin-products';
import WPAdminWCSettingsGeneral from './pages/wp-admin/wp-admin-wc-settings-general';
import WPAdminWCSettingsCheckout from './pages/wp-admin/wp-admin-wc-settings-checkout';
import WPAdminWCSettingsCheckoutBACS from './pages/wp-admin/wp-admin-wc-settings-checkout-bacs';
import WPAdminWCSettingsCheckoutCOD from './pages/wp-admin/wp-admin-wc-settings-checkout-cod';
import WPAdminWCSettingsCheckoutPayPal from './pages/wp-admin/wp-admin-wc-settings-checkout-paypal';

export const PAGE = Object.assign(
	PageMap.PAGE,
	{
		SHOP: {
			object: ShopPage,
			path: '/shop'
		},
		CART: {
			object: CartPage,
			path: '/cart'
		},
		CHECKOUT: {
			object: CheckoutPage,
			path: '/checkout'
		},
		WP_ADMIN_PRODUCTS: {
			object: WPAdminProducts,
			path: '/wp-admin/edit.php?post_type=product'
		},
		WP_ADMIN_NEW_PRODUCT: {
			object: WPAdminProductNew,
			path: '/wp-admin/post-new.php?post_type=product'
		},
		WP_ADMIN_EDIT_PRODUCT: {
			object: WPAdminProductEdit,
			path: '/wp-admin/post.php?post=%s&action=edit'
		},
		WP_ADMIN_WC_SETTINGS_GENERAL: {
			object: WPAdminWCSettingsGeneral,
			path: '/wp-admin/admin.php?page=wc-settings'
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT: {
			object: WPAdminWCSettingsCheckout,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout'
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_BACS: {
			object: WPAdminWCSettingsCheckoutBACS,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=bacs'
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_COD: {
			object: WPAdminWCSettingsCheckoutCOD,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=cod'
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_PAYPAL: {
			object: WPAdminWCSettingsCheckoutPayPal,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=paypal'
		}
	}
);

export function getPageUrl( baseUrl, page, ...args ) {
	return PageMap.getPageUrl( baseUrl, page.path, ...args );
}
