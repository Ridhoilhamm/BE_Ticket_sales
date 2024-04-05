const multer = require(`multer`);
const path = require(`path`);

//jadi function ini digunakan untuk konfigurasi storage(penyimpanan)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./image`); //mendefinisikan tempat untuk storagenya
  },
  filename: (req, file, cb) => {
    cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({storage: storage,
  //digunakan untuk memfilter file (upload)
  fileFilter: (req, file, cb) => {
    //filter type file
    const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false);
      return cb(`invalid file type(${file.mimetype})`);
    }
    //filter size file
    const fileSize = req.headers[`content-length`];
    const maxSize = 1 * 1024 * 1024; //maximum 1mb
    if (fileSize > maxSize) {
      cb(null, false);
      return cb(`file size too large`);
    }
    cb(null, true); //berhasil mengupload file
  },
});
module.exports = upload;
