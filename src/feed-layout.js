// Settings for the graphical layout of timeline feed elements, in storage

const { ipcRenderer } = require("electron");

const getFrameSize = () => {
  return ipcRenderer.invoke("get-frame-size");
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

module.exports = { getFrameSize, getLazyViewport, frameGaps };
