# Fedapay NodeJS Library

The Fedapay Node library provides convenient access to the Fedapay API from
applications written in server-side JavaScript.

## Documentation

See the [Node API docs](https://fedapay.com/docs/api/node).

## Installation

Install the package with:

```
    npm install fedapay --save
```

## Usage

The package needs to be configured with your account's secret key which is
available in your [Fedapay Dashboard][api-keys]. Require it with the key's
value:

``` js
var fedapay = require('fedapay');

```