const enableLazyScrolling = (
  pictureSize = 864,
  numberOfPictures = 7,
  mediaGraphicID = "media-graphic"
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
        let mediaGraphic = document.getElementById(
          `${mediaGraphicID}-${oldVisibleIndex}`
        );

        if (mediaGraphic == null) return;

        mediaGraphic.src = "";
        mediaGraphic.removeAttribute("src");
        mediaGraphic.style.display = "none";
      });

    visibleIndexes = newVisibleIndexes;

    // Download src of viewable graphic if not set.
    visibleIndexes.forEach((visibleIndex) => {
      let mediaGraphic = document.getElementById(
        `${mediaGraphicID}-${visibleIndex}`
      );

      if (mediaGraphic == null) return;

      if (mediaGraphic.src == "") {
        mediaGraphic.src = mediaGraphic.dataset.src;
        mediaGraphic.style.display = "block";
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