/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in string matchers like containsString,
 *     startsWith, endsWith, etc.
 */

goog.provide('goog.labs.testing.stringmatcher');

goog.require('goog.asserts');
goog.require('goog.labs.testing.Matcher');
goog.require('goog.string');

/**
 * Matches any string value.
 *
 * @constructor @struct @implements {goog.labs.testing.Matcher} @final
 */
goog.labs.testing.stringmatcher.AnyStringMatcher = () => {};

/** @override */
goog.labs.testing.stringmatcher.AnyStringMatcher.prototype.matches = (actualValue) =>
  typeof actualValue === 'string';

/** @override */
goog.labs.testing.stringmatcher.AnyStringMatcher.prototype.describe = (actualValue) =>
  '<' + actualValue + '> is not a string';

/**
 * The ContainsString matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.ContainsStringMatcher = function (value) {
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input string contains the expected string.
 *
 * @override
 */
goog.labs.testing.stringmatcher.ContainsStringMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertString(actualValue);
  return goog.string.contains(actualValue, this.value_);
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.ContainsStringMatcher.prototype.describe = function (actualValue) {
  return actualValue + ' does not contain ' + this.value_;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.ContainsStringMatcher.prototype.toString = function () {
  return 'ContainsStringMatcher[' + this.value_ + ']';
};

/**
 * The EndsWith matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.EndsWithMatcher = function (value) {
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input string ends with the expected string.
 *
 * @override
 */
goog.labs.testing.stringmatcher.EndsWithMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertString(actualValue);
  return goog.string.endsWith(actualValue, this.value_);
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.EndsWithMatcher.prototype.describe = function (actualValue) {
  return actualValue + ' does not end with ' + this.value_;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.EndsWithMatcher.prototype.toString = function () {
  return 'EndsWithMatcher[' + this.value_ + ']';
};

/**
 * The EqualToIgnoringWhitespace matcher.  Collapses all whitespace down to a
 * single space before comparing the strings.  It is also case-insensitive.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher = function (value) {
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input string is the expected string when all whitespace in both
 * has been collapsed down into a single space.  Does a case-insensitive match.
 *
 * @override
 * @param {*} actualValue
 * @return {boolean}
 */
goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher.prototype.matches = function (
  actualValue
) {
  goog.asserts.assertString(actualValue);
  const collapsedActualValue = goog.string.collapseWhitespace(actualValue);
  const collapsedExpectedValue = goog.string.collapseWhitespace(this.value_);

  return goog.string.caseInsensitiveCompare(collapsedActualValue, collapsedExpectedValue) === 0;
};

/**
 * @override
 * @param {*} actualValue
 * @return {string}
 */
goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher.prototype.describe = function (
  actualValue
) {
  goog.asserts.assertString(actualValue);
  const collapsedSuppliedValue = goog.string.collapseWhitespace(actualValue);
  const collapsedExpectedString = goog.string.collapseWhitespace(this.value_);
  return `"${actualValue}" collapses to "${
    collapsedSuppliedValue
  }" which is not equal(ignoring whitespace and case) to "${
    this.value_
  }" which collapses to "${collapsedExpectedString}"`;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher.prototype.toString = function () {
  return 'EqualToIgnoringWhitespaceMatcher[' + this.value_ + ']';
};

/**
 * The Equals matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.EqualsMatcher = function (value) {
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input string is equal to the expected string.
 *
 * @override
 */
goog.labs.testing.stringmatcher.EqualsMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertString(actualValue);
  return this.value_ === actualValue;
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.EqualsMatcher.prototype.describe = function (actualValue) {
  return actualValue + ' is not equal to ' + this.value_;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.EqualsMatcher.prototype.toString = function () {
  return 'EqualsMatcher[' + this.value_ + ']';
};

/**
 * The MatchesRegex matcher.
 *
 * @param {!RegExp} regex The expected regex.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.RegexMatcher = function (regex) {
  /**
   * @type {!RegExp}
   * @private
   */
  this.regex_ = regex;
};

/**
 * Determines if input string is equal to the expected string.
 *
 * @override
 */
goog.labs.testing.stringmatcher.RegexMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertString(actualValue);
  return this.regex_.test(actualValue);
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.RegexMatcher.prototype.describe = function (actualValue) {
  return actualValue + ' does not match ' + this.regex_;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.RegexMatcher.prototype.toString = function () {
  return 'RegexMatcher[' + this.regex_ + ']';
};

/**
 * The StartsWith matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.StartsWithMatcher = function (value) {
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input string starts with the expected string.
 *
 * @override
 */
goog.labs.testing.stringmatcher.StartsWithMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertString(actualValue);
  return goog.string.startsWith(actualValue, this.value_);
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.StartsWithMatcher.prototype.describe = function (actualValue) {
  return actualValue + ' does not start with ' + this.value_;
};

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.StartsWithMatcher.prototype.toString = function () {
  return 'StartsWithMatcher[' + this.value_ + ']';
};

/**
 * The StringContainsInOrdermatcher.
 *
 * @param {Array<string>} values The expected string values.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.stringmatcher.StringContainsInOrderMatcher = function (values) {
  /**
   * @type {Array<string>}
   * @private
   */
  this.values_ = values;
};

/**
 * Determines if input string contains, in order, the expected array of strings.
 * @override
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
goog.labs.testing.stringmatcher.StringContainsInOrderMatcher.prototype.matches = function (
  actualValue
) {
  goog.asserts.assertString(actualValue);
  var currentIndex,
    previousIndex = 0;
  for (var i = 0; i < this.values_.length; i++) {
    currentIndex = goog.string.contains(actualValue, this.values_[i]);
    if (currentIndex < 0 || currentIndex < previousIndex) {
      return false;
    }
    previousIndex = currentIndex;
  }
  return true;
};

/**
 * @override
 */
goog.labs.testing.stringmatcher.StringContainsInOrderMatcher.prototype.describe = (actualValue) =>
  actualValue + ' does not contain the expected values in order.';

/**
 * @return {string}
 * @override
 */
goog.labs.testing.stringmatcher.StringContainsInOrderMatcher.prototype.toString = function () {
  return 'StringContainsInOrderMatcher[' + this.values_ + ']';
};

/** @return {!goog.labs.testing.stringmatcher.AnyStringMatcher} */
goog.labs.testing.stringmatcher.AnyStringMatcher.anyString = () =>
  new goog.labs.testing.stringmatcher.AnyStringMatcher();

/**
 * Matches a string containing the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.ContainsStringMatcher} A
 *     ContainsStringMatcher.
 */
goog.labs.testing.stringmatcher.ContainsStringMatcher.containsString = (value) =>
  new goog.labs.testing.stringmatcher.ContainsStringMatcher(value);

/**
 * Matches a string that ends with the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.EndsWithMatcher} A
 *     EndsWithMatcher.
 */
goog.labs.testing.stringmatcher.EndsWithMatcher.endsWith = (value) =>
  new goog.labs.testing.stringmatcher.EndsWithMatcher(value);

/**
 * Matches a string that equals (ignoring whitespace) the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher} A
 *     EqualToIgnoringWhitespaceMatcher.
 */
goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher.equalToIgnoringWhitespace = (
  value
) => new goog.labs.testing.stringmatcher.EqualToIgnoringWhitespaceMatcher(value);

/**
 * Matches a string that equals the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.EqualsMatcher} A EqualsMatcher.
 */
goog.labs.testing.stringmatcher.EqualsMatcher.equals = (value) =>
  new goog.labs.testing.stringmatcher.EqualsMatcher(value);

/**
 * Matches a string against a regular expression.
 *
 * @param {!RegExp} regex The expected regex.
 *
 * @return {!goog.labs.testing.stringmatcher.RegexMatcher} A RegexMatcher.
 */
goog.labs.testing.stringmatcher.RegexMatcher.matchesRegex = (regex) =>
  new goog.labs.testing.stringmatcher.RegexMatcher(regex);

/**
 * Matches a string that starts with the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.StartsWithMatcher} A
 *     StartsWithMatcher.
 */
goog.labs.testing.stringmatcher.StartsWithMatcher.startsWith = (value) =>
  new goog.labs.testing.stringmatcher.StartsWithMatcher(value);

/**
 * Matches a string that contains the given strings in order.
 *
 * @param {Array<string>} values The expected value.
 *
 * @return {!goog.labs.testing.stringmatcher.StringContainsInOrderMatcher} A
 *     StringContainsInOrderMatcher.
 */
goog.labs.testing.stringmatcher.StringContainsInOrderMatcher.stringContainsInOrder = (values) =>
  new goog.labs.testing.stringmatcher.StringContainsInOrderMatcher(values);
