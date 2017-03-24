The first thing you're going to have to do is set up your environment so that you can run the tests we're going to write. Before getting started with this, you should already have a local or live WordPress site available with WooCommerce installed. I also recommend using the twenty-twelve theme since it doesn't modify the WooCommerce templates, and everything in this tutorial should work without needing special considerations on twenty-twelve.

- Create a folder named `wc-e2e-page-objects-tutorial` for everything to live in.

- Create a `package.json` file in the folder, and add the following to `package.json`:

```json
{
	"name": "wc-e2e-page-objects-tutorial",
	"version": "0.0.1",
	"description": "WooCommerce Page Objects tutorial",
	"scripts": {
		"test": "cross-env NODE_CONFIG_DIR='./config' BABEL_ENV=commonjs mocha --compilers js:babel-register --recursive"
	},
	"dependencies": {},
	"devDependencies": {
		"config": "^1.24.0",
		"babel": "^6.5.2",
		"babel-cli": "^6.14.0",
		"babel-eslint": "^7.0.0",
		"babel-plugin-add-module-exports": "^0.2.1",
		"babel-preset-es2015": "^6.14.0",
		"babel-preset-stage-2": "^6.13.0",
		"chai": "^3.5.0",
		"chai-as-promised": "^6.0.0",
		"cross-env": "^3.0.0",
		"istanbul": "^1.0.0-alpha",
		"mocha": "^3.0.2",
		"chromedriver": "^2.25.0",
		"wc-e2e-page-objects": "0.2.2"
	}
}
```

- Run `npm install`.

- Create a `.babelrc` file in the `wc-e2e-page-objects-tutorial` folder, and add the following to `.babelrc`:

```json
{
	"presets": [
		"es2015",
		"stage-2"
	],
	"plugins": [
		"add-module-exports"
	]
}
```

- Create a folder called `config` in the `wc-e2e-page-objects-tutorial` folder.

- In the `config` folder created a file called `default.json` and put the following in `default.json`:

```json
{
	"url": "http://local.wordpress.dev",
	"users": {
		"admin": {
			"username": "admin",
			"password": "password"
		},
		"customer": {
			"username": "",
			"password": ""
		}
	},
	"startBrowserTimeoutMs": 30000,
	"mochaTimeoutMs": 120000
}
```
For this tutorial, go ahead and put your actual site URL and admin credentials in config.json. If you're using a live site for testing, make sure you don't expose your credentials by committing them to GitHub or something.

- Create a folder called `tests`.

- You should have the following before moving on to the fun part (writing the tests):

```json
wc-e2e-page-objects-tutorial folder
	package.json file
	.babelrc file
	config folder
		default.json file
	tests folder
	node_modules folder with dependencies installed in it
```

Ready to move on?

## [Writing your first tests.](tutorial-first-test.html)
