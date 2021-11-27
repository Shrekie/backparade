// Cautiously switches graphics loaded 
// within a viewport with scroll posisition as basis
// to save performance

const setVisibleMedia = (
  pictureSize = 864,
  numberOfPictures = 8,
  mediaFrameID = "media-frame"
) => {
  let visibleIndexes = Array(numberOfPictures).fill(0);

  // Calculate indexes visible
  let newVisibleIndexes = visibleIndexes.map((_, indexHeight) =>
    Math.round(
      (window.scrollY + window.innerHeight / 2) / pictureSize +
        indexHeight -
        numberOfPictures / 2
    )
  );

  // Clear old non visible graphics.
  visibleIndexes
    .filter((visibleIndex) => !newVisibleIndexes.includes(visibleIndex))
    .forEach((oldVisibleIndex) => {
      let mediaFrame = document.getElementById(
        `${mediaFrameID}-${oldVisibleIndex}`
      );

      if (mediaFrame == null) return;

      mediaFrame.src = "";
      mediaFrame.removeAttribute("src");
      mediaFrame.style.display = "none";
      mediaFrame = null;
    });

  // Download src of viewable graphic if not already.
  newVisibleIndexes.forEach((visibleIndex) => {
    let mediaFrame = document.getElementById(`${mediaFrameID}-${visibleIndex}`);

    if (mediaFrame == null) return;

    if (mediaFrame.src == "") {
      mediaFrame.src = mediaFrame.dataset.src;
      mediaFrame.style.display = "block";
    }
  });
};

const enableLazyScrolling = (
  pictureSize = 864,
  numberOfPictures = 8,
  mediaFrameID = "media-frame"
) => {
  setVisibleMedia(pictureSize, numberOfPictures, mediaFrameID);

  // Update visible indexes on scroll
  // NOTE: inneficient, should not be called on every scroll.
  // Performance does not seem to suffer notably from this
  window.addEventListener("scroll", (_) => {
    setVisibleMedia(pictureSize, numberOfPictures, mediaFrameID);
  });
};

module.exports = { enableLazyScrolling, setVisibleMedia };
