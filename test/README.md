Notes on Testing this package
=============================

Currently tests are run against a local WordPress site at http://wc-e2e.dev/.
Test site is created with WooCommerce products dummy data and uses the Storefront
theme.

## Running the test

```
npm run test
```

## Test configs

Test config files can be found in `test/config`. To override specific config
based on active environment, create a `local-{env}.json` file. It's gitignored.

## Running specific test file

```
npm run test:single test/front-page.js
```
