// Parses file content in given directory

const { readdir, stat } = require("fs/promises");

const getDirFiles = (dirPath) => {
  return readdir(dirPath).then((names) => {
    return Promise.all(
      // Get promise of file metadata
      names.map((name) => stat(`${dirPath}/${name}`))
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

/*
.filter(
  (file) =>
    path.extname(file.name) == ".mp4" || path.extname(file.name) == ".webm"
)
*/
module.exports = { getDirFiles };