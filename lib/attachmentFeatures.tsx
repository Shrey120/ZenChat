export const attachmentFeatures = (url: string) => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  ) {
    return "video";
  } else if (
    fileExtension === "mp3" ||
    fileExtension === "wav" ||
    fileExtension === "audio"
  ) {
    return "audio";
  } else if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  ) {
    return "image";
  } else {
    return "file";
  }
};
