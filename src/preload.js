// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require("electron");
const { testPath } = require("../private.js");

const { getDirFiles, displayDirFiles } = require("./directorypiper.js");
const { enableLazyScrolling } = require("./lazyscroller.js");

window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.invoke("open", "test").then((dirPath) => {
    console.log(dirPath);
  });
  getDirFiles(testPath).then((files) => {
    displayDirFiles(testPath, files, "directory-list", "1536px", "864px");
    enableLazyScrolling(864, 7, "media-graphic");
  });
});
