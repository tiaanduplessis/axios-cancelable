
# 🛑 axios-cancelable
[![package version](https://img.shields.io/npm/v/axios-cancelable.svg?style=flat-square)](https://npmjs.org/package/axios-cancelable)
[![package downloads](https://img.shields.io/npm/dm/axios-cancelable.svg?style=flat-square)](https://npmjs.org/package/axios-cancelable)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/axios-cancelable.svg?style=flat-square)](https://npmjs.org/package/axios-cancelable)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/axios-cancelable.svg)](https://greenkeeper.io/)

> Utility for cancellation of requests when using axios

## Table of Contents

- [🛑 axios-cancelable](#axios-cancelable)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Install](#install)
  - [Usage](#usage)
  - [Contribute](#contribute)
  - [License](#license)

## About

Personalized and actively maintained fork of [axios-cancel](https://github.com/thaerlabs/axios-cancel)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install axios-cancelable
$ # OR
$ yarn add axios-cancelable
```

## Usage

```js
import axios from 'axios';
import axiosCancel from 'axios-cancelable';

axiosCancel(axios, {
  debug: false // default
});

...

// Single request cancellation
const requestId = 'my_sample_request';
const promise = axios.get(url, {
  requestId: requestId
})
  .then((res) => {
    console.log('resolved');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancel(requestId);
// aborts the HTTP request and logs `request cancelled`
```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
    