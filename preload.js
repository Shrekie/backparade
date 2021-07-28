// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { testPath } = require("./private.js");
const { readdir, stat } = require("fs/promises");

// All file names from a directory
readdir(testPath).then((names) => {
  Promise.all(
    // Metadata promise each file in directory by name
    names.map((name) => stat(`${testPath}/${name}`))
  ).then((metadata) => {
    // Merge name with metadata
    files = names.map((name, index) => ({ name, ...metadata[index] }));

    // Play
    files.forEach((file) => {
      const field = document.createElement("p");
      field.innerHTML = file.name;

      const thumbnail = document.createElement("img");
      thumbnail.src = `${testPath}/${file.name}`;
      thumbnail.width = 50;
      thumbnail.height = 50;

      document.getElementById("directory-list").appendChild(field);
      document.getElementById("directory-list").appendChild(thumbnail);
    });
  });
});

window.addEventListener("DOMContentLoaded", () => {});
