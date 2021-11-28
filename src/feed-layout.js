// Settings for the graphical layout of timeline feed
// some properties are taken from disk storage

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
  // NOTE: dynamic number of pictures visible based on size

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
