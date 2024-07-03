/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrappers for HTML5 Entry objects. These are all in the same
 * file to avoid circular dependency issues.
 *
 * When adding or modifying functionality in this namespace, be sure to update
 * the mock counterparts in goog.testing.fs.
 */
goog.provide('goog.fs.DirectoryEntry');
goog.provide('goog.fs.DirectoryEntry.Behavior');
goog.provide('goog.fs.Entry');
goog.provide('goog.fs.FileEntry');

goog.requireType('goog.async.Deferred');
goog.requireType('goog.fs.FileSystem');
goog.requireType('goog.fs.FileWriter');

/**
 * The interface for entries in the filesystem.
 * @interface
 */
goog.fs.Entry = () => {};

/**
 * @return {boolean} Whether or not this entry is a file.
 */
goog.fs.Entry.prototype.isFile = () => {};

/**
 * @return {boolean} Whether or not this entry is a directory.
 */
goog.fs.Entry.prototype.isDirectory = () => {};

/**
 * @return {string} The name of this entry.
 */
goog.fs.Entry.prototype.getName = () => {};

/**
 * @return {string} The full path to this entry.
 */
goog.fs.Entry.prototype.getFullPath = () => {};

/**
 * @return {!goog.fs.FileSystem} The filesystem backing this entry.
 */
goog.fs.Entry.prototype.getFileSystem = () => {};

/**
 * Retrieves the last modified date for this entry.
 *
 * @return {!goog.async.Deferred} The deferred Date for this entry. If an error
 *     occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.getLastModified = () => {};

/**
 * Retrieves the metadata for this entry.
 *
 * @return {!goog.async.Deferred} The deferred Metadata for this entry. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.getMetadata = () => {};

/**
 * Move this entry to a new location.
 *
 * @param {!goog.fs.DirectoryEntry} parent The new parent directory.
 * @param {string=} opt_newName The new name of the entry. If omitted, the entry
 *     retains its original name.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
 *     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.moveTo = (parent, opt_newName) => {};

/**
 * Copy this entry to a new location.
 *
 * @param {!goog.fs.DirectoryEntry} parent The new parent directory.
 * @param {string=} opt_newName The name of the new entry. If omitted, the new
 *     entry has the same name as the original.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
 *     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.copyTo = (parent, opt_newName) => {};

/**
 * Wrap an HTML5 entry object in an appropriate subclass instance.
 *
 * @param {!Entry} entry The underlying Entry object.
 * @return {!goog.fs.Entry} The appropriate subclass wrapper.
 * @protected
 */
goog.fs.Entry.prototype.wrapEntry = (entry) => {};

/**
 * Get the URL for this file.
 *
 * @param {string=} opt_mimeType The MIME type that will be served for the URL.
 * @return {string} The URL.
 */
goog.fs.Entry.prototype.toUrl = (opt_mimeType) => {};

/**
 * Get the URI for this file.
 *
 * @deprecated Use {@link #toUrl} instead.
 * @param {string=} opt_mimeType The MIME type that will be served for the URI.
 * @return {string} The URI.
 */
goog.fs.Entry.prototype.toUri = (opt_mimeType) => {};

/**
 * Remove this entry.
 *
 * @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
 *     the callback is called with true. If an error occurs, the errback is
 *     called a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.remove = () => {};

/**
 * Gets the parent directory.
 *
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
 *     If an error occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.Entry.prototype.getParent = () => {};

/**
 * A directory in a local FileSystem.
 *
 * @interface
 * @extends {goog.fs.Entry}
 */
goog.fs.DirectoryEntry = () => {};

/**
 * Behaviors for getting files and directories.
 * @enum {number}
 */
goog.fs.DirectoryEntry.Behavior = {
  /**
   * Get the file if it exists, error out if it doesn't.
   */
  DEFAULT: 1,
  /**
   * Get the file if it exists, create it if it doesn't.
   */
  CREATE: 2,
  /**
   * Error out if the file exists, create it if it doesn't.
   */
  CREATE_EXCLUSIVE: 3,
};

/**
 * Get a file in the directory.
 *
 * @param {string} path The path to the file, relative to this directory.
 * @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
 *     handling an existing file, or the lack thereof.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry}. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
goog.fs.DirectoryEntry.prototype.getFile = (path, opt_behavior) => {};

/**
 * Get a directory within this directory.
 *
 * @param {string} path The path to the directory, relative to this directory.
 * @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
 *     handling an existing directory, or the lack thereof.
 * @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
 *     If an error occurs, the errback is called a {@link goog.fs.Error}.
 */
goog.fs.DirectoryEntry.prototype.getDirectory = (path, opt_behavior) => {};

/**
 * Opens the directory for the specified path, creating the directory and any
 * intermediate directories as necessary.
 *
 * @param {string} path The directory path to create. May be absolute or
 *     relative to the current directory. The parent directory ".." and current
 *     directory "." are supported.
 * @return {!goog.async.Deferred} A deferred {@link goog.fs.DirectoryEntry} for
 *     the requested path. If an error occurs, the errback is called with a
 *     {@link goog.fs.Error}.
 */
goog.fs.DirectoryEntry.prototype.createPath = (path) => {};

/**
 * Gets a list of all entries in this directory.
 *
 * @return {!goog.async.Deferred} The deferred list of {@link goog.fs.Entry}
 *     results. If an error occurs, the errback is called with a
 *     {@link goog.fs.Error}.
 */
goog.fs.DirectoryEntry.prototype.listDirectory = () => {};

/**
 * Removes this directory and all its contents.
 *
 * @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
 *     the callback is called with true. If an error occurs, the errback is
 *     called a {@link goog.fs.Error}.
 */
goog.fs.DirectoryEntry.prototype.removeRecursively = () => {};

/**
 * A file in a local filesystem.
 *
 * @interface
 * @extends {goog.fs.Entry}
 */
goog.fs.FileEntry = () => {};

/**
 * Create a writer for writing to the file.
 *
 * @return {!goog.async.Deferred<!goog.fs.FileWriter>} If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
goog.fs.FileEntry.prototype.createWriter = () => {};

/**
 * Get the file contents as a File blob.
 *
 * @return {!goog.async.Deferred<!File>} If an error occurs, the errback is
 *     called with a {@link goog.fs.Error}.
 */
goog.fs.FileEntry.prototype.file = () => {};
