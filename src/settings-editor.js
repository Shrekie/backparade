// App wide settings GUI

const { ipcRenderer } = require("electron");
const { setFrameSize } = require("./feed-layout.js");

const createSettingsEditor = (mediaTimelineContainer, loadFeed) => {
  const settingsContainer = document.createElement("div");
  settingsContainer.style.position = "fixed";
  settingsContainer.style.top = "10px";
  settingsContainer.style.right = "10px";
  settingsContainer.style.zIndex = "1";
  settingsContainer.style.background =
    "linear-gradient(to right, #00b4db, #0083b0)";

  const settingsNumInput = document.createElement("input");
  settingsNumInput.style.width = "100px";
  settingsNumInput.style.margin = "10px";
  settingsNumInput.style.textAlign = "center";
  settingsNumInput.style.border = "1px solid black";
  settingsNumInput.style.padding = "5px";
  settingsNumInput.style.fontSize = "12px";
  settingsNumInput.style.backgroundColor = "white";
  settingsNumInput.style.color = "black";
  settingsNumInput.style.borderRadius = "5px";
  settingsNumInput.style.cursor = "pointer";
  settingsNumInput.setAttribute("type", "number");

  const mediaHeightInput = settingsNumInput.cloneNode(true);
  mediaHeightInput.placeholder = "Media height";
  settingsContainer.appendChild(mediaHeightInput);

  const settingsSubmitButton = document.createElement("button");
  settingsSubmitButton.innerHTML = "Submit";
  settingsSubmitButton.style.margin = "10px";
  settingsSubmitButton.style.background =
    "linear-gradient(to right, #00b4db, #0083b0)";
  settingsSubmitButton.style.borderRadius = "5px";
  settingsSubmitButton.style.color = "white";
  settingsSubmitButton.style.padding = "10px";
  settingsSubmitButton.style.border = "1px solid #ccc";
  settingsSubmitButton.style.cursor = "pointer";
  settingsSubmitButton.onclick = () =>
    onClickSettingsSubmit(
      { width: 1536, height: mediaHeightInput.valueAsNumber },
      mediaTimelineContainer,
      loadFeed
    );
  settingsContainer.appendChild(settingsSubmitButton);

  return settingsContainer;
};

const onClickSettingsSubmit = async (
  settings,
  mediaTimelineContainer,
  loadFeed
) => {
  await setFrameSize(settings.width, settings.height);
  const directoryPath = await ipcRenderer.invoke("get-directory-path");

  loadFeed(directoryPath, mediaTimelineContainer);
};

module.exports = {
  createSettingsEditor,
};
