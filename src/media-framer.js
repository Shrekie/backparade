// Elements that hold the graphics of media

const path = require("path");

const createMediaFramesContainer = (
  index,
  width = "1536px",
  height = "864px"
) => {
  const mediaFramesContainer = document.createElement("div");

  mediaFramesContainer.style.width = width;
  mediaFramesContainer.style.height = height;
  mediaFramesContainer.style.margin = "0 auto";

  mediaFramesContainer.id = `media-frames-container-${index}`;

  return mediaFramesContainer;
};

const createMediaFrame = (index, fileName, filePath, height = "864px") => {
  let mediaFrame;

  if (path.extname(fileName) == ".mp4" || path.extname(fileName) == ".webm") {
    mediaFrame = document.createElement("video");

    mediaFrame.autoplay = true;
    mediaFrame.volume = 0.005;
    mediaFrame.muted = true;
    mediaFrame.loop = true;
    mediaFrame.controls = true;
  } else mediaFrame = document.createElement("img");

  mediaFrame.dataset.src = `${filePath}/${fileName}`;

  mediaFrame.style.objectFit = "contain";
  mediaFrame.style.width = "100%";
  mediaFrame.style.height = height;
  mediaFrame.style.display = "none";

  mediaFrame.id = `media-frame-${index}`;

  const mediaFramesContainer = createMediaFramesContainer(index);
  mediaFramesContainer.appendChild(mediaFrame);

  return mediaFramesContainer;
};

const createMediaTimeline = (
  dirPath,
  files,
  timelineContainer = document.body,
  mediaWidth = "1536px",
  mediaHeight = "864px"
) => {
  files.forEach((file, index) => {
    mediaFrame = createMediaFrame(index, file.name, dirPath, mediaHeight);
    timelineContainer.appendChild(mediaFrame);
  });
};

module.exports = { createMediaFrame, createMediaTimeline };
