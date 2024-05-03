import multer from 'multer';

// Create a storage object for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where the uploaded files will be stored
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    // const hostName = req.get('host')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        file.originalname.substring(file.originalname.lastIndexOf('.'))
    );
  }
});

// Create the multer middleware
const multerUpload = multer({
  storage: storage,
  // Limit the size of the uploaded file to 5MB
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // Check if the file is an image and pdf file
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and pdf files are allowed'));
    }
  }
});

export default multerUpload;