// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { getDirectoryFiles } = require("./file-lister.js");
const { createMediaTimeline } = require("./media-framer.js");
const { setVisibleMedia } = require("./lazy-scroller.js");

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
const { enableLazyScrolling } = require("./lazy-scroller.js");
const { createDirectorySelector } = require("./directory-selector.js");
const { createSettingsEditor } = require("./settings-editor.js");

contextBridge.exposeInMainWorld("timeline", {
  enableLazyScrolling,
  createDirectorySelector,
  createSettingsEditor,
  loadFeed,
  getDirectoryPath,
});
