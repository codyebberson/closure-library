/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.i18n.uCharTest');

const testSuite = goog.require('goog.testing.testSuite');
const uChar = goog.require('goog.i18n.uChar');

testSuite({
  testToHexString() {
    const result = uChar.toHexString('\uD869\uDED6');
    assertEquals('U+2A6D6', result);
  },

  testPadString() {
    /** @suppress {visibility} suppression added to enable type checking */
    const result = uChar.padString_('abc', 4, '0');
    assertEquals('0abc', result);
  },

  testToCharCode() {
    const result = uChar.toCharCode('\uD869\uDED6');
    assertEquals(0x2a6d6, result);
  },

  testcodePointAt() {
    // Basic cases.
    assertEquals(0x006c, uChar.getCodePointAround('Hello!', 2));
    assertEquals(
      0x2708 /* Airplane symbol (non-ASCII) */,
      uChar.getCodePointAround('Hello\u2708', 5)
    );

    // Supplementary characters.
    assertEquals(0x2a6d6, uChar.getCodePointAround('\uD869\uDED6', 0));
    assertEquals(-0x2a6d6, uChar.getCodePointAround('\uD869\uDED6', 1));
    assertEquals(0xd869, uChar.getCodePointAround('\uD869' + 'w', 0));
    assertEquals(0xded6, uChar.getCodePointAround('\uD869' + 'w' + '\uDED6', 2));
  },

  testBuildSupplementaryCodePoint() {
    const result = uChar.buildSupplementaryCodePoint(0xd869, 0xded6);
    assertEquals(0x2a6d6, result);
    assertNull(uChar.buildSupplementaryCodePoint(0xded6, 0xd869));
    assertNull(uChar.buildSupplementaryCodePoint(0xd869, 0xac00));
  },

  testCharCount() {
    assertEquals(2, uChar.charCount(0x2a6d6));
    assertEquals(1, uChar.charCount(0xac00));
  },

  testIsSupplementaryCodePoint() {
    assertTrue(uChar.isSupplementaryCodePoint(0x2a6d6));
    assertFalse(uChar.isSupplementaryCodePoint(0xac00));
  },

  testIsLeadSurrogateCodepoint() {
    assertTrue(uChar.isLeadSurrogateCodePoint(0xd869));
    assertFalse(uChar.isLeadSurrogateCodePoint(0xded6));
    assertFalse(uChar.isLeadSurrogateCodePoint(0xac00));
  },

  testIsTrailSurrogateCodePoint() {
    assertTrue(uChar.isTrailSurrogateCodePoint(0xded6));
    assertFalse(uChar.isTrailSurrogateCodePoint(0xd869));
    assertFalse(uChar.isTrailSurrogateCodePoint(0xac00));
  },

  testFromCharCode() {
    const result = uChar.fromCharCode(0x2a6d6);
    assertEquals('\uD869\uDED6', result);
  },

  testFromCharCode_invalidValues() {
    let result = uChar.fromCharCode(-1);
    assertEquals(null, result);

    /** @suppress {visibility} suppression added to enable type checking */
    result = uChar.fromCharCode(uChar.CODE_POINT_MAX_VALUE_ + 1);
    assertEquals(null, result);

    /** @suppress {checkTypes} suppression added to enable type checking */
    result = uChar.fromCharCode(null);
    assertEquals(null, result);

    /** @suppress {checkTypes} suppression added to enable type checking */
    result = uChar.fromCharCode(undefined);
    assertEquals(null, result);

    result = uChar.fromCharCode(Number.NaN);
    assertEquals(null, result);
  },
});
