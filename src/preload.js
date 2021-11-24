// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { testPath } = require("../private.js");

const { getDirFiles } = require("./file-lister.js");
const { createMediaTimeline } = require("./media-frame.js");
const { enableLazyScrolling } = require("./lazy-scroller.js");
const { createDirectorySelector } = require("./directory-selector.js");

window.addEventListener("DOMContentLoaded", () => {
  const mediaTimelineContainer = document.createElement("div");
  document.body.appendChild(mediaTimelineContainer);
  console.log(createDirectorySelector(mediaTimelineContainer));
  document.body.appendChild(createDirectorySelector(mediaTimelineContainer));

  getDirFiles(testPath).then((files) => {
    createMediaTimeline(testPath, files, mediaTimelineContainer);
    enableLazyScrolling();
  });
});
