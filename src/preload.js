// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { testPath } = require("../private.js");

const { getDirFiles, displayDirFiles } = require("./directorypiper.js");
const { enableLazyScrolling } = require("./lazyscroller.js");

window.addEventListener("DOMContentLoaded", () => {
  getDirFiles(testPath).then((files) => {
    displayDirFiles(testPath, files, "directory-list", "1536px", "864px");
    enableLazyScrolling(864, 7, "media-graphic");
  });
});
