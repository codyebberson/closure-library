/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.i18n.LocaleFeatureTest');
const LocaleFeature = goog.require('goog.i18n.LocaleFeature');

goog.setTestOnly('goog.i18n.localeFeatureTest');

const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testUseEcmaScript2020: () => {
    assertTrue(typeof LocaleFeature.USE_ECMASCRIPT_I18N_2020 !== 'undefined');
  },

  testUseEcmaScript2021: () => {
    assertTrue(typeof LocaleFeature.USE_ECMASCRIPT_I18N_2021 !== 'undefined');
  },

  testRdtfFlag: () => {
    assertTrue(typeof LocaleFeature.USE_ECMASCRIPT_I18N_RDTF !== 'undefined');
  },

  testNumFormatFlag: () => {
    assertTrue(typeof LocaleFeature.USE_ECMASCRIPT_I18N_NUMFORMAT !== 'undefined');
  },

  testRdtfOptOutFlag: () => {
    assertFalse(typeof LocaleFeature.ECMASCRIPT_INTL_OPT_OUT === 'undefined');
  },

  testRdtfOptOutFlagSet: () => {
    assertFalse(LocaleFeature.ECMASCRIPT_INTL_OPT_OUT);
  },
});
