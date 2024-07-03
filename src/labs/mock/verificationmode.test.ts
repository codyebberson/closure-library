/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.labs.mock.VerificationModeTest');
goog.setTestOnly('goog.labs.mock.VerificationModeTest');

const testSuite = goog.require('goog.testing.testSuite');
const verification = goog.require('goog.labs.mock.verification');

const atLeast = verification.atLeast;
const atMost = verification.atMost;
const never = verification.never;
const times = verification.times;

testSuite({
  getTestName: () => 'goog.labs.mock.VerificationModeTest',

  testTimesVerify_expectedEqualsActual_shouldReturnTrue: () => {
    assertTrue(times(4).verify(4));
  },

  testTimesVerify_expectedGreaterThanActual_shouldReturnFalse: () => {
    assertFalse(times(4).verify(3));
  },

  testTimesVerify_expectedLessThanActual_shouldReturnFalse: () => {
    assertFalse(times(4).verify(5));
  },

  testTimesDescribe_shouldReturnCorrectMessage: () => {
    assertEquals(4 + ' times', times(4).describe());
  },

  testNeverVerify_shouldEqualTimesZeroVerify: () => {
    assertEquals(times(0).verify(0), never().verify(0));
  },

  testNeverDescribe_shouldReturnTimesZeroMessage: () => {
    assertEquals(times(0).describe(), never().describe());
  },

  testAtLeastVerify_expectedEqualsActual_shouldReturnTrue: () => {
    assertTrue(atLeast(4).verify(4));
  },

  testAtLeastVerify_expectedLessThanActual_shouldReturnTrue: () => {
    assertTrue(atLeast(1).verify(3));
  },

  testAtLeastVerify_expectedGreaterThanActual_shouldReturnFalse: () => {
    assertFalse(atLeast(4).verify(3));
  },

  testAtLeastDescribe_shouldReturnCorrectMessage: () => {
    assertEquals('at least ' + 4 + ' times', atLeast(4).describe());
  },

  testAtMostVerify_expectedEqualsActual_shouldReturnTrue: () => {
    assertTrue(atMost(4).verify(4));
  },

  testAtMostVerify_expectedGreaterThanActual_shouldReturnTrue: () => {
    assertTrue(atMost(4).verify(3));
  },

  testAtMostVerify_expectedLessThanActual_shouldReturnFalse: () => {
    assertFalse(atMost(1).verify(3));
  },

  testAtMostDescribe_shouldReturnCorrectMessage: () => {
    assertEquals('at most ' + 4 + ' times', atMost(4).describe());
  },
});
