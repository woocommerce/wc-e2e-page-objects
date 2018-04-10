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
import MyAccountPage from './pages/my-account-page';
import WPAdminProductEdit from './pages/wp-admin/wp-admin-product-edit';
import WPAdminProductNew from './pages/wp-admin/wp-admin-product-new';
import WPAdminProducts from './pages/wp-admin/wp-admin-products';
import WPAdminOrderEdit from './pages/wp-admin/wp-admin-order-edit';
import WPAdminOrderNew from './pages/wp-admin/wp-admin-order-new';
import WPAdminOrders from './pages/wp-admin/wp-admin-orders';
import WPAdminCouponEdit from './pages/wp-admin/wp-admin-coupon-edit';
import WPAdminCouponNew from './pages/wp-admin/wp-admin-coupon-new';
import WPAdminCoupons from './pages/wp-admin/wp-admin-coupons';
import WPAdminWCSettingsTax from './pages/wp-admin/wp-admin-wc-settings-tax';
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
			path: '/shop',
		},
		CART: {
			object: CartPage,
			path: '/cart',
		},
		CHECKOUT: {
			object: CheckoutPage,
			path: '/checkout',
		},
		MY_ACCOUNT: {
			object: MyAccountPage,
			path: '/my-account',
		},
		WP_ADMIN_PRODUCTS: {
			object: WPAdminProducts,
			path: '/wp-admin/edit.php?post_type=product',
		},
		WP_ADMIN_NEW_PRODUCT: {
			object: WPAdminProductNew,
			path: '/wp-admin/post-new.php?post_type=product',
		},
		WP_ADMIN_EDIT_PRODUCT: {
			object: WPAdminProductEdit,
			path: '/wp-admin/post.php?post=%s&action=edit',
		},
		WP_ADMIN_ORDERS: {
			object: WPAdminOrders,
			path: '/wp-admin/edit.php?post_type=shop_order',
		},
		WP_ADMIN_NEW_ORDER: {
			object: WPAdminOrderNew,
			path: '/wp-admin/post-new.php?post_type=shop_order',
		},
		WP_ADMIN_EDIT_ORDER: {
			object: WPAdminOrderEdit,
			path: '/wp-admin/post.php?post=%s&action=edit',
		},
		WP_ADMIN_COUPONS: {
			object: WPAdminCoupons,
			path: '/wp-admin/edit.php?post_type=shop_coupon',
		},
		WP_ADMIN_NEW_COUPON: {
			object: WPAdminCouponNew,
			path: '/wp-admin/post-new.php?post_type=shop_coupon',
		},
		WP_ADMIN_EDIT_COUPON: {
			object: WPAdminCouponEdit,
			path: '/wp-admin/post.php?post=%s&action=edit',
		},
		WP_ADMIN_WC_SETTINGS_GENERAL: {
			object: WPAdminWCSettingsGeneral,
			path: '/wp-admin/admin.php?page=wc-settings',
		},
		WP_ADMIN_WC_SETTINGS_TAX: {
			object: WPAdminWCSettingsTax,
			path: '/wp-admin/admin.php?page=wc-settings&tab=tax',
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT: {
			object: WPAdminWCSettingsCheckout,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout',
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_BACS: {
			object: WPAdminWCSettingsCheckoutBACS,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=bacs',
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_COD: {
			object: WPAdminWCSettingsCheckoutCOD,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=cod',
		},
		WP_ADMIN_WC_SETTINGS_CHECKOUT_PAYPAL: {
			object: WPAdminWCSettingsCheckoutPayPal,
			path: '/wp-admin/admin.php?page=wc-settings&tab=checkout&section=paypal',
		},
	}
);

export function getPageUrl( baseUrl, page, ...args ) {
	return PageMap.getPageUrl( baseUrl, page, ...args );
}
