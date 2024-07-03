/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.async.AnimationDelayTest');
goog.setTestOnly('goog.async.AnimationDelayTest');

const AnimationDelay = goog.require('goog.async.AnimationDelay');
const Promise = goog.require('goog.Promise');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const Timer = goog.require('goog.Timer');
const testSuite = goog.require('goog.testing.testSuite');

const TEST_DELAY = 50;
const stubs = new PropertyReplacer();

testSuite({
  tearDown: () => {
    stubs.reset();
  },

  testStart: () => {
    let resolver = Promise.withResolver();
    const start = Date.now();
    const delay = new AnimationDelay((end) => {
      assertNotNull(resolver); // fail if called multiple times
      resolver.resolve();
      resolver = null;
    });

    delay.start();

    return resolver.promise;
  },

  testStop: () => {
    const resolver = Promise.withResolver();
    const start = Date.now();
    const delay = new AnimationDelay((end) => {
      resolver.reject();
    });

    delay.start();
    delay.stop();

    return Timer.promise(TEST_DELAY).then(() => {
      resolver.resolve();
      return resolver.promise;
    });
  },

  testAlwaysUseGoogNowForHandlerTimestamp: () => {
    const resolver = Promise.withResolver();
    const expectedValue = 12345.1;
    stubs.set(Date, 'now', () => expectedValue);

    const delay = new AnimationDelay((timestamp) => {
      assertEquals(expectedValue, timestamp);
      resolver.resolve();
    });

    delay.start();

    return resolver.promise;
  },

  testStartIfActive: () => {
    const delay = new AnimationDelay(() => {});
    delay.start();

    let startWasCalled = false;
    stubs.set(AnimationDelay.prototype, 'start', () => {
      startWasCalled = true;
    });

    delay.startIfNotActive();
    assertEquals(startWasCalled, false);
    delay.stop();
    delay.startIfNotActive();
    assertEquals(startWasCalled, true);
  },
});
