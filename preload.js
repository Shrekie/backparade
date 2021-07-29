// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { testPath } = require("./private.js");

var path = require("path");

const { readdir, stat } = require("fs/promises");

const getDirFiles = () => {
  return readdir(testPath).then((names) => {
    return Promise.all(
      // Metadata promise each file in directory by name
      names.map((name) => stat(`${testPath}/${name}`))
    ).then((metadata) => {
      // Merge name with metadata
      return (files = names.map((name, index) => ({
        name,
        ...metadata[index],
      })));
    });
  });
};

// All file names from a directory
readdir(testPath).then((names) => {
  Promise.all(
    // Metadata promise each file in directory by name
    names.map((name) => stat(`${testPath}/${name}`))
  ).then((metadata) => {
    // Merge name with metadata
    files = names.map((name, index) => ({ name, ...metadata[index] }));

    files.sort((a, b) => a.ctimeMs - b.ctimeMs);
    // Play
    files.forEach((file, index) => {
      const mediaContainer = document.createElement("div");

      mediaContainer.style.width = "1536px";
      mediaContainer.style.height = "864px";
      mediaContainer.style.margin = "0 auto";

      mediaContainer.id = `media-container-${index}`;

      let mediaGraphic;

      if (
        path.extname(file.name) == ".mp4" ||
        path.extname(file.name) == ".webm"
      ) {
        mediaGraphic = document.createElement("video");

        mediaGraphic.autoplay = true;
        mediaGraphic.muted = true;
        mediaGraphic.loop = true;
        mediaGraphic.controls = true;
      } else mediaGraphic = document.createElement("img");

      mediaGraphic.dataset.src = `${testPath}/${file.name}`;

      mediaGraphic.style.objectFit = "contain";
      mediaGraphic.style.width = "100%";
      mediaGraphic.style.height = "864px";

      mediaGraphic.id = `media-graphic-${index}`;

      document.getElementById("directory-list").appendChild(mediaContainer);
      mediaContainer.appendChild(mediaGraphic);
    });
  });
});

window.addEventListener("DOMContentLoaded", () => {});

const pictureSize = 864;
const numberOfPictures = 7;
let visibleIndexes = Array(numberOfPictures).fill(0);
const getVisibleFileIndexes = () => {
  // Clear previous array of indexes
  // Should have a seperate cache
  visibleIndexes.forEach((visibleIndex) => {
    mediaGraphic = document.getElementById(`media-graphic-${visibleIndex}`);
    mediaGraphic.src = "";
  });

  // Calculate indexes visible in viewport given picturesize and
  // number of pictures
  visibleIndexes = visibleIndexes.map((_, indexHeight) =>
    Math.ceil(window.scrollY / pictureSize + indexHeight - numberOfPictures / 2)
  );

  visibleIndexes.forEach((visibleIndex) => {
    mediaGraphic = document.getElementById(`media-graphic-${visibleIndex}`);
    mediaGraphic.src = mediaGraphic.dataset.src;
  });
};

// timeoutScroll is horrible?
let timeoutScroll = null;
window.addEventListener("scroll", (_) => {
  clearTimeout(timeoutScroll);
  timeoutScroll = setTimeout(() => getVisibleFileIndexes(), 500);
});
