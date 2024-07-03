/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Easing functions for animations.
 */

goog.provide('goog.fx.easing');

/**
 * Ease in - Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeIn = (t) => goog.fx.easing.easeInInternal_(t, 3);

/**
 * Ease in with specifiable exponent.
 * @param {number} t Input between 0 and 1.
 * @param {number} exp Ease exponent.
 * @return {number} Output between 0 and 1.
 * @private
 */
goog.fx.easing.easeInInternal_ = (t, exp) => Math.pow(t, exp);

/**
 * Ease out - Start fastest and slows to a stop.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeOut = (t) => goog.fx.easing.easeOutInternal_(t, 3);

/**
 * Ease out with specifiable exponent.
 * @param {number} t Input between 0 and 1.
 * @param {number} exp Ease exponent.
 * @return {number} Output between 0 and 1.
 * @private
 */
goog.fx.easing.easeOutInternal_ = (t, exp) => 1 - goog.fx.easing.easeInInternal_(1 - t, exp);

/**
 * Ease out long - Start fastest and slows to a stop with a long ease.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeOutLong = (t) => goog.fx.easing.easeOutInternal_(t, 4);

/**
 * Ease in and out - Start slow, speed up, then slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.inAndOut = (t) => 3 * t * t - 2 * t * t * t;
