// Lists file content in a given directory

const { readdir, stat } = require("fs/promises");

const getDirectoryFiles = (directoryPath) => {
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
      return files;
    });
  });
};

module.exports = { getDirectoryFiles };
