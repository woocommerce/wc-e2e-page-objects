wc-e2e-page-objects is a collection of classes representing screens and screen components from a generic WooCommerce site. You can use these classes and Selenium to perform actions on a live or local WooCommerce site for end-to-end testing. The [WooCommerce](https://github.com/woocommerce/woocommerce) team uses this library for end-to-end testing before large releases by automatically navigating around a site to verify that everything is working correctly. WooCommerce Extension developers can use this library for developing end-to-end tests for their extensions.

It is highly recommended you first go through the very brief [wp-e2e-webdriver tutorial](https://woocommerce.github.io/wp-e2e-webdriver/wp-e2e-webdriver/0.10.0/tutorial-overview.html) to get an overview of Selenium testing with the wp-e2e-webdriver library. [wp-e2e-webdriver](https://github.com/woocommerce/wp-e2e-webdriver) is a dependency for wc-e2e-page-objects, so it is important to have some familiarity with it. Another dependency you need to get familiar with is [wp-e2e-page-objects](https://github.com/woocommerce/wp-e2e-page-objects). wp-e2e-page-objects is a collection of classes representing screens and screen components on a generic WordPress site. You don't need to be very familiar with these dependencies right when you're starting out, but you will have to reference them while writing tests occasionally.

Ready to go?

This guide will take you through writing a few simple tests for testing a WooCommerce page. You should be able to follow along and have a working test suite at the end of it. This tutorial is primarily intended for WooCommerce extension developers, WooCommerce contributors, and people interested in contributing to WooCommerce. As a prerequisite, you should have at least intermediate familiarity with JavaScript and the JavaScript ecosystem.

## 1. [Environment set up.](tutorial-environment.html)

## 2. [Writing your first tests.](tutorial-first-test.html)

## 3. [Writing admin page tests.](tutorial-admin-test.html)
