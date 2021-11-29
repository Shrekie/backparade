// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {
  createDirectorySelector,
  createSettingsEditor,
  loadFeed,
  getDirectoryPath,
} = window.timeline;

const render = async () => {
  const mediaTimelineContainer = document.createElement("div");
  document.body.appendChild(mediaTimelineContainer);

  document.body.appendChild(
    createDirectorySelector(mediaTimelineContainer, loadFeed)
  );

  document.body.appendChild(
    await createSettingsEditor(mediaTimelineContainer, loadFeed)
  );

  const directoryPath = await getDirectoryPath();
  if (directoryPath != undefined)
    loadFeed(directoryPath, mediaTimelineContainer);

  window.timeline.enableLazyScrolling();
};

render();
