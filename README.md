# DeniBudget

A simple personal financial app developed mostly in React.

This app was implemented just to show as a portfolio. It wasn't a complex web application, but it can give us an idea of how I have worked, knowledges, best practices, patterns and so on.

## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Developer Tools](#developer-tools)
  1. [Routing](#routing)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
  1. [Configuration](#configuration)
  1. [Globals](#globals)
  1. [Styles](#styles)
  1. [Server](#server)
  1. [Production Optimization](#production-optimization)
1. [Learning Resources](#learning-resources)
1. [FAQ](#troubleshooting)
1. [Thank You](#thank-you)

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [eslint](http://eslint.org)

## Requirements
* node `^4.5.0`
* npm `^3.0.0`

## Getting Started

### Cloning

```bash
$ git clone https://github.com/denimar/denibudget.git
$ cd denibudget
```

```bash
$ npm install    # Install project dependencies
```
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure presented in this app is **fractal**, where functionality is grouped primarily by feature rather than file type.

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
TODO: ...inform the route here
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── location.js      # ..
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
```

## Development

### Routing
I used `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Deployment

The deployment happens by run the command `npm run deploy` which will throw the files in `~/dist` folder

## Build System

### Configuration

Default project configuration can be found in `~/config/project.config.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.config.js` and `~/config/project.config.js` and define overrides.

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Express server|
|`server_port`|port for the Express server|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/project.config.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|

### Server

This starter kit comes packaged with an Express server. It's important to note that the purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement and serve the node application as a server side together with the mongodb stuffs. Using a custom Express app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server).

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations.

## Author

[Denimar de Moraes](http://github.com/denimar) (denimar@gmail.com) is a full-stack developper at the HBSis IT Solutions, Blumenau, Santa Catarina, Brazil.
