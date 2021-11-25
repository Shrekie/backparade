// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { enableLazyScrolling } = require("./lazy-scroller.js");
const { createDirectorySelector } = require("./directory-selector.js");

window.addEventListener("DOMContentLoaded", () => {
  const mediaTimelineContainer = document.createElement("div");
  document.body.appendChild(createDirectorySelector(mediaTimelineContainer));
  document.body.appendChild(mediaTimelineContainer);
  enableLazyScrolling();
});
