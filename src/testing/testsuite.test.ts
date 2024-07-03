/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.testing.testSuiteTest');

const TestCase = goog.require('goog.testing.TestCase');
const asserts = goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');

let calls;

testSuite({
  setUp() {
    calls = 0;
    TestCase.initializeTestRunner = () => {
      calls++;
    };
    testSuite.resetForTesting();
  },

  testTestSuiteInitializesRunner() {
    testSuite({ testOne: () => {} });
    assert(calls == 1);
  },

  testTestSuiteInitializesRunnerThrowsOnSecondCall() {
    testSuite({ testOne: () => {} });
    assertThrows(() => {
      testSuite({ testTwo: () => {} });
    });
  },
});
