// Frame elements that render media on a timeline feed

const path = require("path");
var mime = require("mime-types");
const { getFrameSize, frameGaps, frameTags } = require("./layout.js");

const createMediaFrameContainer = (
  index,
  mediaFrameWidth,
  mediaFrameHeight
) => {
  const mediaFramesContainer = document.createElement("div");

  mediaFramesContainer.style.width = mediaFrameWidth;
  mediaFramesContainer.style.height = mediaFrameHeight;
  mediaFramesContainer.style.margin = "0 auto";
  mediaFramesContainer.style.backgroundColor = "#f0f0f0";

  // offset
  mediaFramesContainer.style.border = `${frameGaps.border}px solid #ccc`;
  mediaFramesContainer.style.padding = `${frameGaps.padding}px`;
  mediaFramesContainer.style.marginTop = `${frameGaps.marginTop}px`;
  // offset

  mediaFramesContainer.id = `${frameTags.mediaFramesContainerID}-${index}`;

  return mediaFramesContainer;
};

const createMediaFrame = (
  index,
  fileName,
  filePath,
  mediaFrameWidth,
  mediaFrameHeight
) => {
  let mediaFrame;

  if (!mime.lookup(fileName)) {
    mediaFrame = false;
  } else if (mime.lookup(fileName).includes("video")) {
    mediaFrame = document.createElement("video");
    mediaFrame.autoplay = false;
    mediaFrame.volume = 0.005;
    mediaFrame.muted = true;
    mediaFrame.loop = true;
    mediaFrame.controls = true;
  } else if (mime.lookup(fileName).includes("image")) {
    mediaFrame = document.createElement("img");
  } else {
    mediaFrame = false;
  }

  if (mediaFrame) {
    mediaFrame.dataset.src = `${filePath}/${fileName}`;
    mediaFrame.style.display = "none";
  } else {
    mediaFrame = document.createElement("div");
    mediaFrame.style.display = "flex";
    mediaFrame.style.alignItems = "center";
    mediaFrame.style.justifyContent = "center";
    mediaFrame.innerHTML = fileName;
  }

  mediaFrame.style.objectFit = "contain";
  mediaFrame.style.width = "100%";
  mediaFrame.style.height = mediaFrameHeight;

  mediaFrame.id = `${frameTags.mediaFrameID}-${index}`;

  const mediaFramesContainer = createMediaFrameContainer(
    index,
    mediaFrameWidth,
    mediaFrameHeight
  );
  mediaFramesContainer.appendChild(mediaFrame);

  return mediaFramesContainer;
};

const createMediaTimeline = async (
  dirPath,
  files,
  timelineContainer = document.body
) => {
  const { mediaFrameWidth, mediaFrameHeight } = await getFrameSize();
  files.forEach((file, index) => {
    mediaFrame = createMediaFrame(
      index,
      file.name,
      dirPath,
      `${mediaFrameWidth}px`,
      `${mediaFrameHeight}px`
    );
    timelineContainer.appendChild(mediaFrame);
  });
};

module.exports = { createMediaFrame, createMediaTimeline };
