const path = require("path");

const createMediaContainer = (index, width = "1536px", height = "864px") => {
  const mediaContainer = document.createElement("div");

  mediaContainer.style.width = width;
  mediaContainer.style.height = height;
  mediaContainer.style.margin = "0 auto";

  mediaContainer.id = `media-container-${index}`;

  return mediaContainer;
};

const createMediaGraphic = (index, fileName, filePath, height = "864px") => {
  let mediaGraphic;

  if (path.extname(fileName) == ".mp4" || path.extname(fileName) == ".webm") {
    mediaGraphic = document.createElement("video");

    mediaGraphic.autoplay = true;
    mediaGraphic.volume = 0.005;
    mediaGraphic.muted = true;
    mediaGraphic.loop = true;
    mediaGraphic.controls = true;
  } else mediaGraphic = document.createElement("img");

  mediaGraphic.dataset.src = `${filePath}/${fileName}`;

  mediaGraphic.style.objectFit = "contain";
  mediaGraphic.style.width = "100%";
  mediaGraphic.style.height = height;
  mediaGraphic.style.display = "none";

  mediaGraphic.id = `media-graphic-${index}`;

  return mediaGraphic;
};

module.exports = { createMediaContainer, createMediaGraphic };
