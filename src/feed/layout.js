// Layout of the timeline feed

const { ipcRenderer } = require("electron");

const getFrameSize = () => {
  return ipcRenderer.invoke("get-frame-size");
};

const setFrameSize = (width, height) => {
  return ipcRenderer.invoke("set-frame-size", { width, height });
};

const frameTags = {
  mediaFrameID: "media-frame",
  mediaFramesContainerID: "media-frame-container",
};

const frameGaps = { border: 1, padding: 10, marginTop: 10 };

const getLazyViewport = async () => {
  const { mediaFrameHeight } = await ipcRenderer.invoke("get-frame-size");

  const graphicSize =
    mediaFrameHeight +
    frameGaps.border * 2 +
    frameGaps.padding * 2 +
    frameGaps.marginTop;

  const numberOfGraphicsVisible = 8;
  return { graphicSize, numberOfGraphicsVisible };
};

module.exports = {
  getFrameSize,
  setFrameSize,
  getLazyViewport,
  frameGaps,
  frameTags,
};
