// Lists file content in a given directory

const { readdir, stat } = require("fs/promises");
var mime = require("mime-types");

const getDirectoryFiles = (directoryPath, hideUnsupported = true) => {
  return readdir(directoryPath).then((names) => {
    return Promise.all(
      // Get promise of file metadata
      names.map((name) => stat(`${directoryPath}/${name}`))
    ).then((metadata) => {
      // Merge name with rest of metadata and sort by ctimeMs
      const files = names.map((name, index) => ({
        name,
        ...metadata[index],
      }));
      files.sort((a, b) => a.ctimeMs - b.ctimeMs);

      //TODO: Make hiding all unsupported optional
      if (hideUnsupported)
        return files.filter(
          (file) =>
            mime.lookup(file.name) &&
            (mime.lookup(file.name).includes("image") ||
              mime.lookup(file.name).includes("video"))
        );
      else return files;
    });
  });
};

module.exports = { getDirectoryFiles };
