// const multer = require("multer");

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const maxSize = 2 * 1024 * 1024;
// const DIR = './src/assets/images';
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, DIR);
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, Date.now() + "-" + name  );
//   }
// });

// module.exports = multer({ storage: storage, limits: {  fileSize: maxSize } }).single("avatar");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/assets/images')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" +file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' ) {
    cb(null, true)
  } else {
    cb({message: 'Extension fichier interdit!'}, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {fileSize: 2 * 1024 * 1024},
  fileFilter: fileFilter
}).single("avatar");

module.exports = upload
