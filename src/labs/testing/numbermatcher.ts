/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in number matchers like lessThan,
 * greaterThan, etc.
 */

goog.provide('goog.labs.testing.numbermatcher');

goog.require('goog.asserts');
goog.require('goog.labs.testing.Matcher');

/**
 * Matches any number value.
 *
 * @constructor @struct @implements {goog.labs.testing.Matcher} @final
 */
goog.labs.testing.numbermatcher.AnyNumberMatcher = () => {};

/** @override */
goog.labs.testing.numbermatcher.AnyNumberMatcher.prototype.matches = (actualValue) =>
  typeof actualValue === 'number';

/** @override */
goog.labs.testing.numbermatcher.AnyNumberMatcher.prototype.describe = (actualValue) =>
  '<' + actualValue + '> is not a number';

/**
 * The GreaterThan matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.GreaterThanMatcher = function (value) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if input value is greater than the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.GreaterThanMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue > this.value_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.GreaterThanMatcher.prototype.describe = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not greater than ' + this.value_;
};

/**
 * The lessThan matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.LessThanMatcher = function (value) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if the input value is less than the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.LessThanMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue < this.value_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.LessThanMatcher.prototype.describe = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not less than ' + this.value_;
};

/**
 * The GreaterThanEqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher = function (value) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if the input value is greater than equal to the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher.prototype.matches = function (
  actualValue
) {
  goog.asserts.assertNumber(actualValue);
  return actualValue >= this.value_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher.prototype.describe = function (
  actualValue
) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not greater than equal to ' + this.value_;
};

/**
 * The LessThanEqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.LessThanEqualToMatcher = function (value) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if the input value is less than or equal to the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.LessThanEqualToMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue <= this.value_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.LessThanEqualToMatcher.prototype.describe = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not less than equal to ' + this.value_;
};

/**
 * The EqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.EqualToMatcher = function (value) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};

/**
 * Determines if the input value is equal to the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.EqualToMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue === this.value_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.EqualToMatcher.prototype.describe = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not equal to ' + this.value_;
};

/**
 * The CloseTo matcher.
 *
 * @param {number} value The value to compare.
 * @param {number} range The range to check within.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.numbermatcher.CloseToMatcher = function (value, range) {
  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
  /**
   * @type {number}
   * @private
   */
  this.range_ = range;
};

/**
 * Determines if input value is within a certain range of the expected value.
 *
 * @override
 */
goog.labs.testing.numbermatcher.CloseToMatcher.prototype.matches = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return Math.abs(this.value_ - actualValue) < this.range_;
};

/**
 * @override
 */
goog.labs.testing.numbermatcher.CloseToMatcher.prototype.describe = function (actualValue) {
  goog.asserts.assertNumber(actualValue);
  return actualValue + ' is not close to(' + this.range_ + ') ' + this.value_;
};

/** @return {!goog.labs.testing.numbermatcher.AnyNumberMatcher} */
goog.labs.testing.numbermatcher.AnyNumberMatcher.anyNumber = () =>
  new goog.labs.testing.numbermatcher.AnyNumberMatcher();

/**
 * @param {number} value The expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.GreaterThanMatcher} A
 *     GreaterThanMatcher.
 */
goog.labs.testing.numbermatcher.GreaterThanMatcher.greaterThan = (value) =>
  new goog.labs.testing.numbermatcher.GreaterThanMatcher(value);

/**
 * @param {number} value The expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher} A
 *     GreaterThanEqualToMatcher.
 */
goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher.greaterThanEqualTo = (value) =>
  new goog.labs.testing.numbermatcher.GreaterThanEqualToMatcher(value);

/**
 * @param {number} value The expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.LessThanMatcher} A LessThanMatcher.
 */
goog.labs.testing.numbermatcher.LessThanMatcher.lessThan = (value) =>
  new goog.labs.testing.numbermatcher.LessThanMatcher(value);

/**
 * @param {number} value The expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.LessThanEqualToMatcher} A
 *     LessThanEqualToMatcher.
 */
goog.labs.testing.numbermatcher.LessThanEqualToMatcher.lessThanEqualTo = (value) =>
  new goog.labs.testing.numbermatcher.LessThanEqualToMatcher(value);

/**
 * @param {number} value The expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.EqualToMatcher} An EqualToMatcher.
 */
goog.labs.testing.numbermatcher.EqualToMatcher.equalTo = (value) =>
  new goog.labs.testing.numbermatcher.EqualToMatcher(value);

/**
 * @param {number} value The expected value.
 * @param {number} range The maximum allowed difference from the expected value.
 *
 * @return {!goog.labs.testing.numbermatcher.CloseToMatcher} A CloseToMatcher.
 */
goog.labs.testing.numbermatcher.CloseToMatcher.closeTo = (value, range) =>
  new goog.labs.testing.numbermatcher.CloseToMatcher(value, range);
