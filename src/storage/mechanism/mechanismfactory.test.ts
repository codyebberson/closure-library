/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.storage.mechanism.mechanismfactoryTest');

const iterableMechanismTests = goog.require('goog.storage.mechanism.iterableMechanismTests');
const mechanismSeparationTests = goog.require('goog.storage.mechanism.mechanismSeparationTests');
const mechanismSharingTests = goog.require('goog.storage.mechanism.mechanismSharingTests');
const mechanismTests = goog.require('goog.storage.mechanism.mechanismTests');
const mechanismfactory = goog.require('goog.storage.mechanism.mechanismfactory');
const testSuite = goog.require('goog.testing.testSuite');

let mechanism;
let mechanismShared;
let mechanismSeparate;

testSuite({
  setUp() {
    mechanism = mechanismfactory.create('test');
    mechanismShared = mechanismfactory.create('test');
    mechanismSeparate = mechanismfactory.create('test2');
  },

  tearDown() {
    if (!!mechanism) {
      mechanism.clear();
      mechanism = null;
    }
    if (!!mechanismShared) {
      mechanismShared.clear();
      mechanismShared = null;
    }
    if (!!mechanismSeparate) {
      mechanismSeparate.clear();
      mechanismSeparate = null;
    }
  },

  testAvailability() {
    const probe = mechanismfactory.create();
    if (!!probe) {
      assertNotNull(mechanism);
      assertNotNull(mechanismShared);
      assertNotNull(mechanismSeparate);
    }

    if (!!mechanism) {
      mechanism.clear();
      mechanism = null;
    }
    if (!!mechanismShared) {
      mechanismShared.clear();
      mechanismShared = null;
    }
    if (!!mechanismSeparate) {
      mechanismSeparate.clear();
      mechanismSeparate = null;
    }
  },

  ...mechanismTests.register({
    getMechanism: () => mechanism,
    getMinimumQuota: () => 0,
  }),

  ...iterableMechanismTests.register({
    getMechanism: () => mechanism,
  }),

  ...mechanismSharingTests.register({
    getMechanism: () => mechanism,
    getMechanismShared: () => mechanismShared,
  }),

  ...mechanismSeparationTests.register({
    getMechanism: () => mechanism,
    getMechanismSeparate: () => mechanismSeparate,
  }),
});
