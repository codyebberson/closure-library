/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility functions for managing networking, such as
 * testing network connectivity.
 *
 */

goog.provide('goog.labs.net.webChannel.netUtils');

goog.require('goog.Uri');
goog.require('goog.labs.net.webChannel.WebChannelDebug');

goog.scope(() => {
  const netUtils = goog.labs.net.webChannel.netUtils;
  const WebChannelDebug = goog.labs.net.webChannel.WebChannelDebug;

  /**
   * Default timeout to allow for URI pings.
   * @type {number}
   */
  netUtils.NETWORK_TIMEOUT = 10000;

  /**
   * Pings the network with an image URI to check if an error is a server error
   * or user's network error.
   *
   * The caller needs to add a 'rand' parameter to make sure the response is
   * not fulfilled by browser cache.
   *
   * @param {function(boolean)} callback The function to call back with results.
   * @param {goog.Uri=} opt_imageUri The URI (of an image) to use for the network
   *     test.
   */
  netUtils.testNetwork = (callback, opt_imageUri) => {
    let uri = opt_imageUri;
    if (!uri) {
      // default google.com image
      uri = new goog.Uri('//www.google.com/images/cleardot.gif');

      if (!(goog.global.location && goog.global.location.protocol == 'http')) {
        uri.setScheme('https'); // e.g. chrome-extension
      }
      uri.makeUnique();
    }

    netUtils.testLoadImage(uri.toString(), netUtils.NETWORK_TIMEOUT, callback);
  };

  /**
   * Test loading the given image, retrying if necessary.
   * @param {string} url URL to the image.
   * @param {number} timeout Milliseconds before giving up.
   * @param {function(boolean)} callback Function to call with results.
   * @param {number} retries The number of times to retry.
   * @param {!WebChannelDebug} channelDebug The debug object
   * @param {number=} opt_pauseBetweenRetriesMS Optional number of milliseconds
   *     between retries - defaults to 0.
   */
  netUtils.testLoadImageWithRetries = (
    url,
    timeout,
    callback,
    retries,
    channelDebug,
    opt_pauseBetweenRetriesMS
  ) => {
    channelDebug.debug('TestLoadImageWithRetries: ' + opt_pauseBetweenRetriesMS);
    if (retries == 0) {
      // no more retries, give up
      callback(false);
      return;
    }

    const pauseBetweenRetries = opt_pauseBetweenRetriesMS || 0;
    retries--;
    netUtils.testLoadImage(url, timeout, (succeeded) => {
      if (succeeded) {
        callback(true);
      } else {
        // try again
        goog.global.setTimeout(() => {
          netUtils.testLoadImageWithRetries(
            url,
            timeout,
            callback,
            retries,
            channelDebug,
            pauseBetweenRetries
          );
        }, pauseBetweenRetries);
      }
    });
  };

  /**
   * Test loading the given image.
   * @param {string} url URL to the image.
   * @param {number} timeout Milliseconds before giving up.
   * @param {function(boolean)} callback Function to call with results.
   * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
   */
  netUtils.testLoadImage = (url, timeout, callback) => {
    const channelDebug = new WebChannelDebug();
    channelDebug.debug('TestLoadImage: loading ' + url);
    if (goog.global.Image) {
      const img = new Image();
      img.onload = goog.partial(
        netUtils.imageCallback_,
        channelDebug,
        img,
        'TestLoadImage: loaded',
        true,
        callback
      );
      img.onerror = goog.partial(
        netUtils.imageCallback_,
        channelDebug,
        img,
        'TestLoadImage: error',
        false,
        callback
      );
      img.onabort = goog.partial(
        netUtils.imageCallback_,
        channelDebug,
        img,
        'TestLoadImage: abort',
        false,
        callback
      );
      img.ontimeout = goog.partial(
        netUtils.imageCallback_,
        channelDebug,
        img,
        'TestLoadImage: timeout',
        false,
        callback
      );

      goog.global.setTimeout(() => {
        if (img.ontimeout) {
          img.ontimeout();
        }
      }, timeout);
      img.src = url;
    } else {
      // log ERROR_OTHER from environements where Image is not supported
      callback(false);
    }
  };

  /**
   * Wrap the image callback with debug and cleanup logic.
   * @param {!WebChannelDebug} channelDebug The WebChannelDebug object.
   * @param {!Image} img The image element.
   * @param {string} debugText The debug text.
   * @param {boolean} result The result of image loading.
   * @param {function(boolean)} callback The image callback.
   * @private
   */
  netUtils.imageCallback_ = (channelDebug, img, debugText, result, callback) => {
    try {
      channelDebug.debug(debugText);
      netUtils.clearImageCallbacks_(img);
      callback(result);
    } catch (e) {
      channelDebug.dumpException(e);
    }
  };

  /**
   * Clears handlers to avoid memory leaks.
   * @param {Image} img The image to clear handlers from.
   * @private
   * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
   */
  netUtils.clearImageCallbacks_ = (img) => {
    img.onload = null;
    img.onerror = null;
    img.onabort = null;
    img.ontimeout = null;
  };
}); // goog.scope
