const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const { edit, oldImageName } = req.body;
    if (edit && oldImageName) {
      const originalFileName = oldImageName.split('/')?.slice(-1)[0];
      console.log(originalFileName);
      cb(null, `${originalFileName}`);
    } else {
      cb(null, `${nanoid()}${path.extname(file.originalname)}`);
    }

  }
})

var upload = multer({ storage: storage })

module.exports = upload;