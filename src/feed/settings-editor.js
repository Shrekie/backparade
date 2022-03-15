// App wide settings GUI

const { ipcRenderer } = require("electron");
const { setFrameSize, getFrameSize } = require("./layout.js");

const createSettingsNumInput = () => {
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

  return settingsNumInput;
};

const createSettingsSubmitButton = (mediaTimelineContainer, loadFeed) => {
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
      {
        width: 1536,
        height: document.getElementById(getSettingID().mediaHeight)
          .valueAsNumber,
      },
      mediaTimelineContainer,
      loadFeed
    );

  return settingsSubmitButton;
};

const getSettingID = () => {
  return { mediaHeight: "media-height" };
};

const createSettingsEditor = async (mediaTimelineContainer, loadFeed) => {
  const settingsContainer = document.createElement("div");
  settingsContainer.style.position = "fixed";
  settingsContainer.style.top = "10px";
  settingsContainer.style.right = "10px";
  settingsContainer.style.zIndex = "1";
  settingsContainer.style.background =
    "linear-gradient(to right, #00b4db, #0083b0)";

  const mediaHeightInput = createSettingsNumInput().cloneNode(true);
  mediaHeightInput.id = getSettingID().mediaHeight;
  mediaHeightInput.placeholder = "Media height";
  const { mediaFrameHeight } = await getFrameSize();
  mediaHeightInput.value = mediaFrameHeight;
  settingsContainer.appendChild(mediaHeightInput);

  settingsContainer.appendChild(
    createSettingsSubmitButton(mediaTimelineContainer, loadFeed)
  );

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
