import { Request } from "express";
import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where files will be stored
    cb(null, 'src/uploads/images');
  },
  filename: function (req, file, cb) {
    // Get user Id and specify it for the unique avatar name
    const user = (req.session as any).user;


    // Specify a unique filename for uploaded files
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-user-' + user._id;
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});


const fileFilter = function (req: Request, file: any, cb: any) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
export { upload };