/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wraps an iterable storage mechanism and creates artificial
 * namespaces using a prefix in the global namespace.
 */

goog.provide('goog.storage.mechanism.PrefixedMechanism');

goog.require('goog.iter');
goog.require('goog.iter.Iterator');
goog.require('goog.storage.mechanism.IterableMechanism');

/**
 * Wraps an iterable storage mechanism and creates artificial namespaces.
 *
 * @param {!goog.storage.mechanism.IterableMechanism} mechanism Underlying
 *     iterable storage mechanism.
 * @param {string} prefix Prefix for creating an artificial namespace.
 * @constructor
 * @struct
 * @extends {goog.storage.mechanism.IterableMechanism}
 * @final
 */
goog.storage.mechanism.PrefixedMechanism = function (mechanism, prefix) {
  goog.storage.mechanism.PrefixedMechanism.base(this, 'constructor');
  /**
   * The mechanism to be prefixed.
   *
   * @private {goog.storage.mechanism.IterableMechanism}
   */
  this.mechanism_ = mechanism;

  /**
   * The prefix for creating artificial namespaces.
   *
   * @private {string}
   */
  this.prefix_ = prefix + '::';
};
goog.inherits(goog.storage.mechanism.PrefixedMechanism, goog.storage.mechanism.IterableMechanism);

/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.set = function (key, value) {
  this.mechanism_.set(this.prefix_ + key, value);
};

/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.get = function (key) {
  return this.mechanism_.get(this.prefix_ + key);
};

/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.remove = function (key) {
  this.mechanism_.remove(this.prefix_ + key);
};

/** @override */
goog.storage.mechanism.PrefixedMechanism.prototype.__iterator__ = function (opt_keys) {
  const subIter = this.mechanism_[Symbol.iterator]();
  const newIter = new goog.iter.Iterator();
  /**
   * @return {!IIterableResult<string>}
   * @override
   */
  newIter.next = () => {
    let key;
    let it = subIter.next();
    if (it.done) return it;
    key = it.value;
    while (key.slice(0, this.prefix_.length) != this.prefix_) {
      it = subIter.next();
      if (it.done) return it;
      key = it.value;
    }
    return goog.iter.createEs6IteratorYield(
      /** @type {string} */ (opt_keys ? key.slice(this.prefix_.length) : this.mechanism_.get(key))
    );
  };

  return newIter;
};
