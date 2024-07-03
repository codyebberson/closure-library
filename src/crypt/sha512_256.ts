/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SHA-512/256 cryptographic hash.
 *
 * WARNING:  SHA-256 and SHA-512/256 are different members of the SHA-2
 * family of hashes.  Although both give 32-byte results, the two results
 * should bear no relationship to each other.
 *
 * Please be careful before using this hash function.
 * <p>
 * Usage:
 *   var sha512_256 = new goog.crypt.Sha512_256();
 *   sha512_256.update(bytes);
 *   var hash = sha512_256.digest();
 */

goog.provide('goog.crypt.Sha512_256');

goog.require('goog.crypt.Sha2_64bit');

/**
 * Constructs a SHA-512/256 cryptographic hash.
 *
 * @constructor
 * @extends {goog.crypt.Sha2_64bit}
 * @final
 * @struct
 */
goog.crypt.Sha512_256 = function () {
  goog.crypt.Sha512_256.base(
    this,
    'constructor',
    4 /* numHashBlocks */,
    goog.crypt.Sha512_256.INIT_HASH_BLOCK_
  );
};
goog.inherits(goog.crypt.Sha512_256, goog.crypt.Sha2_64bit);

/** @private {!Array<number>} */
goog.crypt.Sha512_256.INIT_HASH_BLOCK_ = [
  // Section 5.3.6.2 of
  // csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
  0x22312194,
  0xfc2bf72c, // H0
  0x9f555fa3,
  0xc84c64c2, // H1
  0x2393b86b,
  0x6f53b151, // H2
  0x96387719,
  0x5940eabd, // H3
  0x96283ee2,
  0xa88effe3, // H4
  0xbe5e1e25,
  0x53863992, // H5
  0x2b0199fc,
  0x2c85b8aa, // H6
  0x0eb72ddc,
  0x81c52ca2, // H7
];
