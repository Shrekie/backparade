// Cautiously switches graphics loaded
// within a viewport with scroll posisition as basis
// to save performance

const { getLazyViewport, frameTags } = require("./feed-layout.js");

const setVisibleMedia = async () => {
  const { graphicSize, numberOfGraphicsVisible } = await getLazyViewport();

  let visibleIndexes = Array(numberOfGraphicsVisible).fill(0);

  // Calculate indexes visible
  let newVisibleIndexes = visibleIndexes.map((_, indexHeight) =>
    Math.round(
      (window.scrollY + window.innerHeight / 2) / graphicSize +
        indexHeight -
        numberOfGraphicsVisible / 2
    )
  );

  // Clear old non visible graphics.
  visibleIndexes
    .filter((visibleIndex) => !newVisibleIndexes.includes(visibleIndex))
    .forEach((oldVisibleIndex) => {
      let mediaFrame = document.getElementById(
        `${frameTags.mediaFrameID}-${oldVisibleIndex}`
      );

      if (mediaFrame == null) return;

      mediaFrame.src = "";
      mediaFrame.removeAttribute("src");
      mediaFrame.style.display = "none";
      mediaFrame = null;
    });

  // Download src of viewable graphic if not already.
  newVisibleIndexes.forEach((visibleIndex) => {
    let mediaFrame = document.getElementById(
      `${frameTags.mediaFrameID}-${visibleIndex}`
    );

    if (mediaFrame == null) return;

    if (mediaFrame.src == "") {
      mediaFrame.src = mediaFrame.dataset.src;
      mediaFrame.style.display = "block";
    }
  });
};

const enableLazyScrolling = async () => {
  setVisibleMedia();

  // Update visible indexes on scroll
  // NOTE: inneficient, should not be called on every scroll.
  // Performance does not seem to suffer notably from this
  window.addEventListener("scroll", (_) => {
    setVisibleMedia();
  });
};

module.exports = { enableLazyScrolling, setVisibleMedia };
