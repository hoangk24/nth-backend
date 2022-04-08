import { HttpException } from '@/exceptions/HttpException';
import multer, { FileFilterCallback } from 'multer';

const uploadFile = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new HttpException(400, 'File is not supported'));
    }
    cb(null, true);
  },
});
export default uploadFile;
