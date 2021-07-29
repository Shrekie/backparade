const { readdir, stat } = require("fs/promises");

const {
  createMediaContainer,
  createMediaGraphic,
} = require("./gallerydisplayer.js");

const getDirFiles = (dirPath) => {
  return readdir(dirPath).then((names) => {
    return Promise.all(
      // Metadata promise each file in directory by name
      names.map((name) => stat(`${dirPath}/${name}`))
    ).then((metadata) => {
      // Merge name with metadata
      return (files = names.map((name, index) => ({
        name,
        ...metadata[index],
      })));
    });
  });
};

const displayDirFiles = (
  dirPath,
  files,
  listContainer = "directory-list",
  mediaWidth = "1536px",
  mediaHeight = "864px"
) => {
  files.sort((a, b) => a.ctimeMs - b.ctimeMs);

  files.forEach((file, index) => {
    const mediaContainer = createMediaContainer(index, mediaWidth, mediaHeight),
      mediaGraphic = createMediaGraphic(index, file.name, dirPath, mediaHeight);

    document.getElementById(listContainer).appendChild(mediaContainer);
    mediaContainer.appendChild(mediaGraphic);
  });
};

/*
.filter(
  (file) =>
    path.extname(file.name) == ".mp4" || path.extname(file.name) == ".webm"
)
*/
module.exports = { getDirFiles, displayDirFiles };
