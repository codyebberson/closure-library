/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Abstract interface for storing and retrieving data using
 * some persistence mechanism.
 */

goog.provide('goog.storage.mechanism.Mechanism');

/**
 * Basic interface for all storage mechanisms.
 *
 * @constructor
 * @struct
 * @abstract
 */
goog.storage.mechanism.Mechanism = () => {};

/**
 * Set a value for a key.
 *
 * @param {string} key The key to set.
 * @param {string} value The string to save.
 * @abstract
 */
goog.storage.mechanism.Mechanism.prototype.set = (key, value) => {};

/**
 * Get the value stored under a key.
 *
 * @param {string} key The key to get.
 * @return {?string} The corresponding value, null if not found.
 * @abstract
 */
goog.storage.mechanism.Mechanism.prototype.get = (key) => {};

/**
 * Remove a key and its value.
 *
 * @param {string} key The key to remove.
 * @abstract
 */
goog.storage.mechanism.Mechanism.prototype.remove = (key) => {};
