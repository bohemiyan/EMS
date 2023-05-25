const multer =require('multer')


// Set up multer middleware with appropriate configuration
const upload = multer({
    limits: {
      fileSize: 2000000 // max file 2mb = 2000000 bytes
  },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/'); // Set the destination folder for uploaded files
        },
        filename: (req, file, cb) => {
          cb(null, Date.now()+'-'+file.originalname); // Use the original filename for uploaded files
        },
      }),
      fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png|JPG)$/)){
            cb(new Error('only update files with jpeg or jpeg or png format .'));
        }
        cb(undefined, true) // Continue with upload
    }
  
    });
  module.exports = upload;