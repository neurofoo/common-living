/* eslint-disable import/first */
const admin = require('firebase-admin');
require('firebase-functions');
const fft = require('firebase-functions-test');

const x = require('../keys/common-living-61c59141c7d8.json');
/**
 * This file initializes the firebase-functions-test and firebase app
 *
 */

console.log(!!fft, fft, x);
admin.initializeApp();

// tslint:disable-next-line: no-implicit-dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = fft(
  {
    projectId: 'common-living',
    serviceAccountId: 'common-living@appspot.gserviceaccount.com',
  },
  // './doesnt.json',
  './src/common-living-61c59141c7d8.json',
);

console.log(!!test);

// tslint:disable-next-line: no-implicit-dependencies
// import * as fft from "firebase-functions-test";

// check to see if app is initalized
// admin.initializeApp();

console.log(admin.app.name);

// export { test };
