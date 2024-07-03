/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in object matchers like equalsObject,
 *     hasProperty, instanceOf, etc.
 */

goog.provide('goog.labs.testing.objectmatcher');

goog.require('goog.labs.testing.Matcher');

/**
 * Matches any object value.
 *
 * @constructor @struct @implements {goog.labs.testing.Matcher} @final
 */
goog.labs.testing.objectmatcher.AnyObjectMatcher = () => {};

/** @override */
goog.labs.testing.objectmatcher.AnyObjectMatcher.prototype.matches = (actualValue) =>
  goog.isObject(actualValue);

/** @override */
goog.labs.testing.objectmatcher.AnyObjectMatcher.prototype.describe = (actualValue) =>
  '<' + actualValue + '> is not an object';

/**
 * The Equals matcher.
 *
 * @param {!Object} expectedObject The expected object.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.ObjectEqualsMatcher = function (expectedObject) {
  /**
   * @type {!Object}
   * @private
   */
  this.object_ = expectedObject;
};

/**
 * Determines if two objects are the same.
 *
 * @override
 */
goog.labs.testing.objectmatcher.ObjectEqualsMatcher.prototype.matches = function (actualObject) {
  return actualObject === this.object_;
};

/**
 * @override
 */
goog.labs.testing.objectmatcher.ObjectEqualsMatcher.prototype.describe = (actualObject) =>
  'Input object is not the same as the expected object.';

/**
 * The HasProperty matcher.
 *
 * @param {string} property Name of the property to test.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.HasPropertyMatcher = function (property) {
  /**
   * @type {string}
   * @private
   */
  this.property_ = property;
};

/**
 * Determines if an object has a property.
 *
 * @override
 */
goog.labs.testing.objectmatcher.HasPropertyMatcher.prototype.matches = function (actualObject) {
  return this.property_ in actualObject;
};

/**
 * @override
 */
goog.labs.testing.objectmatcher.HasPropertyMatcher.prototype.describe = function (actualObject) {
  return 'Object does not have property: ' + this.property_;
};

/**
 * The InstanceOf matcher.
 *
 * @param {!Object} object The expected class object.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.InstanceOfMatcher = function (object) {
  /**
   * @type {!Object}
   * @private
   */
  this.object_ = object;
};

/**
 * Determines if an object is an instance of another object.
 *
 * @override
 */
goog.labs.testing.objectmatcher.InstanceOfMatcher.prototype.matches = function (actualObject) {
  return actualObject instanceof this.object_;
};

/**
 * @override
 */
goog.labs.testing.objectmatcher.InstanceOfMatcher.prototype.describe = (actualObject) =>
  'Input object is not an instance of the expected object';

/**
 * The IsNullOrUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher = () => {};

/**
 * Determines if input value is null or undefined.
 *
 * @override
 */
goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher.prototype.matches = (actualValue) =>
  actualValue == null;

/**
 * @override
 */
goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher.prototype.describe = (actualValue) =>
  actualValue + ' is not null or undefined.';

/**
 * The IsNull matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.IsNullMatcher = () => {};

/**
 * Determines if input value is null.
 *
 * @override
 */
goog.labs.testing.objectmatcher.IsNullMatcher.prototype.matches = (actualValue) =>
  actualValue === null;

/**
 * @override
 */
goog.labs.testing.objectmatcher.IsNullMatcher.prototype.describe = (actualValue) =>
  actualValue + ' is not null.';

/**
 * The IsUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {goog.labs.testing.Matcher}
 * @final
 */
goog.labs.testing.objectmatcher.IsUndefinedMatcher = () => {};

/**
 * Determines if input value is undefined.
 *
 * @override
 */
goog.labs.testing.objectmatcher.IsUndefinedMatcher.prototype.matches = (actualValue) =>
  actualValue === undefined;

/**
 * @override
 */
goog.labs.testing.objectmatcher.IsUndefinedMatcher.prototype.describe = (actualValue) =>
  actualValue + ' is not undefined.';

/** @return {!goog.labs.testing.objectmatcher.AnyObjectMatcher} */
goog.labs.testing.objectmatcher.AnyObjectMatcher.anyObject = () =>
  new goog.labs.testing.objectmatcher.AnyObjectMatcher();

/**
 * Returns a matcher that matches objects that are equal to the input object.
 * Equality in this case means the two objects are references to the same
 * object.
 *
 * @param {!Object} object The expected object.
 *
 * @return {!goog.labs.testing.objectmatcher.ObjectEqualsMatcher} A
 *     ObjectEqualsMatcher.
 */
goog.labs.testing.objectmatcher.ObjectEqualsMatcher.equalsObject = (object) =>
  new goog.labs.testing.objectmatcher.ObjectEqualsMatcher(object);

/**
 * Returns a matcher that matches objects that contain the input property.
 *
 * @param {string} property The property name to check.
 *
 * @return {!goog.labs.testing.objectmatcher.HasPropertyMatcher} A
 *     HasPropertyMatcher.
 */
goog.labs.testing.objectmatcher.HasPropertyMatcher.hasProperty = (property) =>
  new goog.labs.testing.objectmatcher.HasPropertyMatcher(property);

/**
 * Returns a matcher that matches instances of the input class.
 *
 * @param {!Object} object The class object.
 *
 * @return {!goog.labs.testing.objectmatcher.InstanceOfMatcher} A
 *     InstanceOfMatcher.
 */
goog.labs.testing.objectmatcher.InstanceOfMatcher.instanceOfClass = (object) =>
  new goog.labs.testing.objectmatcher.InstanceOfMatcher(object);

/**
 * Returns a matcher that matches all null values.
 *
 * @return {!goog.labs.testing.objectmatcher.IsNullMatcher} A IsNullMatcher.
 */
goog.labs.testing.objectmatcher.IsNullMatcher.isNull = () =>
  new goog.labs.testing.objectmatcher.IsNullMatcher();

/**
 * Returns a matcher that matches all null and undefined values.
 *
 * @return {!goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher} A
 *     IsNullOrUndefinedMatcher.
 */
goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher.isNullOrUndefined = () =>
  new goog.labs.testing.objectmatcher.IsNullOrUndefinedMatcher();

/**
 * Returns a matcher that matches undefined values.
 *
 * @return {!goog.labs.testing.objectmatcher.IsUndefinedMatcher} A
 *     IsUndefinedMatcher.
 */
goog.labs.testing.objectmatcher.IsUndefinedMatcher.isUndefined = () =>
  new goog.labs.testing.objectmatcher.IsUndefinedMatcher();
