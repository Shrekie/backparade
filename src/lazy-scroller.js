// Graphics only within a range is loaded, with scroll posisition as basis

const enableLazyScrolling = (
  pictureSize = 864,
  numberOfPictures = 7,
  mediaFrameID = "media-frame"
) => {
  let visibleIndexes = Array(numberOfPictures).fill(0);
  const getVisibleFileIndexes = () => {
    // Calculate indexes visible in viewport given
    // picture size and number of pictures.
    let newVisibleIndexes = visibleIndexes.map((_, indexHeight) =>
      Math.ceil(
        window.scrollY / pictureSize + indexHeight - numberOfPictures / 2
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
      });

    visibleIndexes = newVisibleIndexes;

    // Download src of viewable graphic if not set.
    visibleIndexes.forEach((visibleIndex) => {
      let mediaFrame = document.getElementById(
        `${mediaFrameID}-${visibleIndex}`
      );

      if (mediaFrame == null) return;

      if (mediaFrame.src == "") {
        mediaFrame.src = mediaFrame.dataset.src;
        mediaFrame.style.display = "block";
      }
    });
  };

  getVisibleFileIndexes();

  // Update visible indexes on scroll.
  // FIXME: inneficient, should not be called on every scroll.
  window.addEventListener("scroll", (_) => {
    getVisibleFileIndexes();
  });
};

module.exports = { enableLazyScrolling };
