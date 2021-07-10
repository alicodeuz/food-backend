const fs = require('fs');
const path = require('path');

function deleteImage(fileName) {
  const currentFileName = path.join(__dirname, '../public', fileName);
  const isFileExist = fs.existsSync(currentFileName);
  console.log(isFileExist);
  console.log(currentFileName)
  if (isFileExist) {
    return fs.unlinkSync(currentFileName);
  }

}

module.exports = {
  deleteImage
}