const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = `public/uploads`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const { edit, oldImageName } = req.body;
    // Replace image if it is exist
    if (edit && oldImageName) {
      const originalFileName = oldImageName.split('/')?.slice(-1)[0];
      cb(null, `${originalFileName}`);
    } else {
      cb(null, `${nanoid()}${path.extname(file.originalname)}`);
    }
  }
})

var upload = multer({ storage: storage })

module.exports = upload;