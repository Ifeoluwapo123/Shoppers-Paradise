const fs = require("fs");

function convertImageToBase64(type, imgName) {
  const base = fs
    .readFileSync(`./public/${type}/${imgName}`)
    .toString("base64");
  const ext = imgName.substring(imgName.indexOf(".") + 1, imgName.length);
  return `data:image/${ext};base64,${base}`;
}

module.exports = convertImageToBase64;
