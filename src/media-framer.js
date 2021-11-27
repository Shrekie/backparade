// Frame elements that render media on a timeline feed

const path = require("path");
const { getFrameSize, frameGaps } = require("./feed-layout.js");

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

  mediaFramesContainer.id = `media-frame-container-${index}`;

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

  if (path.extname(fileName) == ".mp4" || path.extname(fileName) == ".webm") {
    mediaFrame = document.createElement("video");

    mediaFrame.autoplay = false;
    mediaFrame.volume = 0.005;
    mediaFrame.muted = true;
    mediaFrame.loop = true;
    mediaFrame.controls = true;
  } else mediaFrame = document.createElement("img");

  mediaFrame.dataset.src = `${filePath}/${fileName}`;

  mediaFrame.style.objectFit = "contain";
  mediaFrame.style.width = "100%";
  mediaFrame.style.height = mediaFrameHeight;
  mediaFrame.style.display = "none"; // NOTE: may hide lazy placeholder

  mediaFrame.id = `media-frame-${index}`;

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
