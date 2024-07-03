/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.i18n.GraphemeBreakTest');

const GraphemeBreak = goog.require('goog.i18n.GraphemeBreak');
const testSuite = goog.require('goog.testing.testSuite');
const uChar = goog.require('goog.i18n.uChar');

/** @const {function(number):?string} */
const fromCharCode = uChar.fromCharCode;

testSuite({
  testEmptyInput() {
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('a', ''));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('', 'b'));
  },

  testBreakNormalAscii() {
    assertTrue(GraphemeBreak.hasGraphemeBreak('a'.charCodeAt(0), 'b'.charCodeAt(0), true));

    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('a', 'b', true));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakAsciiWithExtendedChar() {
    assertFalse(GraphemeBreak.hasGraphemeBreak('a'.charCodeAt(0), 0x0300, true));

    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('a', fromCharCode(0x0300), true));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakSurrogates() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xda00, 0xdc00, true));
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xdbff, 0xdfff, true));

    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0xda00), fromCharCode(0xdc00), true)
    );
    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0xdbff), fromCharCode(0xdfff), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakHangLxL() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x1100, 0x1100, true));
    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x1100), fromCharCode(0x1100), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakHangL_T() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x1100, 0x11a8));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x1100), fromCharCode(0x11a8)));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakHangLVxV() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xac00, 0x1160, true));
    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0xac00), fromCharCode(0x1160), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakHangLV_L() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0xac00, 0x1100, true));
    assertTrue(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0xac00), fromCharCode(0x1100), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakHangLVTxT() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0xac01, 0x11a8, true));
    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0xac01), fromCharCode(0x11a8), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakThaiPrependLegacy() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0e40, 0x0e01, false));
    assertTrue(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x0e40), fromCharCode(0x0e01), false)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakThaiPrependExtended() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0e40, 0x0e01, true));
    assertTrue(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x0e40), fromCharCode(0x0e01), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakDevaSpacingMarkLegacy() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x0915, 0x093e, false));
    assertTrue(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x0915), fromCharCode(0x093e), false)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakDevaSpacingMarkExtended() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x0915, 0x093e, true));
    assertFalse(
      GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x0915), fromCharCode(0x093e), true)
    );
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakDevaViramaSpace() {
    assertTrue(GraphemeBreak.hasGraphemeBreak(0x094d, 0x0020));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x094d), fromCharCode(0x0020)));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testBreakDevaViramaConsonant() {
    assertFalse(GraphemeBreak.hasGraphemeBreak(0x094d, 0x0915));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings(fromCharCode(0x094d), fromCharCode(0x0915)));
  },

  testEmojiSequences() {
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👦', '🏼'));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👨\u200D', '🚒'));
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('👨', '\u200D🚒'));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('🕵️‍♀️', '👨‍🚒'));
  },

  testEmojiFlagSequences() {
    assertFalse(GraphemeBreak.hasGraphemeBreakStrings('🇦🇨🇦', '🇨'));
    assertTrue(GraphemeBreak.hasGraphemeBreakStrings('🇦🇨', '🇦🇨'));
  },
});
