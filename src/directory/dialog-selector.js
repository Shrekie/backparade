// Selecting the directory of a timeline

const { ipcRenderer } = require("electron");

const createDirectorySelector = (mediaTimelineContainer, loadFeed) => {
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
  onClickDirectorySelector(button, mediaTimelineContainer, loadFeed);
  directorySelectorContainer.appendChild(button);

  return directorySelectorContainer;
};

onClickDirectorySelector = (button, mediaTimelineContainer, loadFeed) => {
  button.onclick = async () => {
    const result = await ipcRenderer.invoke("select-directory");
    if (result.canceled) {
      return;
    }

    const selectedDirectory = result.filePaths[0];
    await ipcRenderer.invoke("set-directory-path", selectedDirectory);

    loadFeed(selectedDirectory, mediaTimelineContainer);
  };
};

module.exports = { createDirectorySelector };
