const { ipcRenderer } = require("electron");
const { getDirFiles } = require("./file-lister.js");
const { createMediaTimeline } = require("./media-framer.js");
const { setVisibleMedia } = require("./lazy-scroller.js");

const createDirectorySelector = (mediaTimelineContainer) => {
  const directorySelectorContainer = document.createElement("div");
  directorySelectorContainer.style.position = "fixed";
  directorySelectorContainer.style.top = "10px";
  directorySelectorContainer.style.left = "10%";
  directorySelectorContainer.style.zIndex = "1";

  const button = document.createElement("div");
  button.innerHTML = "Select Directory";
  button.style.background = "linear-gradient(to right, #00b4db, #0083b0)";
  button.style.borderRadius = "5px";
  button.style.color = "white";
  button.style.padding = "10px";
  button.style.border = "1px solid #ccc";
  button.style.cursor = "pointer";
  directorySelectorContainer.appendChild(button);

  onClickDirectorySelector(button, mediaTimelineContainer);

  return directorySelectorContainer;
};

onClickDirectorySelector = (button, mediaTimelineContainer) => {
  button.onclick = () => {
    ipcRenderer
      .invoke("select-directory")
      .then((result) => setNewDirectory(result, mediaTimelineContainer));
  };
};

const setNewDirectory = (result, mediaTimelineContainer) => {
  if (result.canceled) {
    return;
  }

  mediaTimelineContainer.innerHTML = "";
  getDirFiles(result.filePaths[0]).then((files) => {
    createMediaTimeline(result.filePaths[0], files, mediaTimelineContainer);
    setVisibleMedia();
  });
};

module.exports = { createDirectorySelector };
