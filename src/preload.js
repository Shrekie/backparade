// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge } = require("electron");
const { enableLazyScrolling } = require("./lazy-scroller.js");
const { createDirectorySelector } = require("./directory-selector.js");

contextBridge.exposeInMainWorld("timeline", {
  createDirectorySelector,
  enableLazyScrolling
});
