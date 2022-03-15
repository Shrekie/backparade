// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { getDirectoryFiles } = require("./directory/file-lister.js");
const { createMediaTimeline } = require("./feed/media-frames.js");
const { setVisibleMedia } = require("./feed/lazy-scroller.js");

const loadFeed = (directoryPath, mediaTimelineContainer) => {
  mediaTimelineContainer.innerHTML = "";

  getDirectoryFiles(directoryPath).then((files) => {
    createMediaTimeline(directoryPath, files, mediaTimelineContainer);
    setVisibleMedia();
  });
};

const { ipcRenderer } = require("electron");
const getDirectoryPath = () => ipcRenderer.invoke("get-directory-path");

const { contextBridge } = require("electron");
const { enableLazyScrolling } = require("./feed/lazy-scroller.js");
const { createDirectorySelector } = require("./directory/dialog-selector.js");
const { createSettingsEditor } = require("./feed/settings-editor.js");

contextBridge.exposeInMainWorld("timeline", {
  enableLazyScrolling,
  createDirectorySelector,
  createSettingsEditor,
  loadFeed,
  getDirectoryPath,
});
