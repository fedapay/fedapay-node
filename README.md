# Fedapay NodeJS Library [![Build Status](https://travis-ci.org/fedapay/fedapay-node.svg?branch=master)](https://travis-ci.org/fedapay/fedapay-node)

The Fedapay Node library provides convenient access to the Fedapay API from
applications written in server-side JavaScript.

## Documentation

See the [Node API docs](https://docs.fedapay.com/paiements/transactions).

## Installation

Install the package with:

``` bash
npm install fedapay --save
```

## Usage

The package needs to be configured with your account's secret key which is available in your [Fedapay Dashboard](https://live.fedapay.com/api). Require it with the key's value:

``` js
import { Customer } from 'fedapay';

let customers = await Customer.all();

```
