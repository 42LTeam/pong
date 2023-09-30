import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: "./public/uploads/",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const fileExt = extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        
        if (allowedExtensions.includes(fileExt)) {
          cb(null, true);
        } else {
          cb(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        }
      },
      
    };
  }
}



