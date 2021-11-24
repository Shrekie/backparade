const { ipcRenderer } = require("electron");
const { getDirFiles } = require("./file-lister.js");
const { createMediaTimeline } = require("./media-frame.js");

const createDirectorySelector = (mediaTimelineContainer) => {
  const directorySelectorContainer = document.createElement("div");

  const button = document.createElement("button");
  button.innerHTML = "select";
  directorySelectorContainer.appendChild(button);
  button.onclick = () => {
    ipcRenderer
      .invoke("select-directory")
      .then((result) => setNewDirectory(result, mediaTimelineContainer));
  };

  return directorySelectorContainer;
};

const setNewDirectory = (result, mediaTimelineContainer) => {
  if (result.canceled) {
    return;
  }

  mediaTimelineContainer.innerHTML = "";
  getDirFiles(result.filePaths[0]).then((files) => {
    createMediaTimeline(result.filePaths[0], files, mediaTimelineContainer);
  });
};

module.exports = { createDirectorySelector };
