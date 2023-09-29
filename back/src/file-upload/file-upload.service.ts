import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import sharp from 'sharp';

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
      fileFilter: async (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.png'];

        if (allowedExtensions.includes(extname(file.originalname).toLowerCase())) {
          try {
            await sharp(file.path).metadata();
            cb(null, true);
          } catch {
            cb(new HttpException('Invalid image content', HttpStatus.BAD_REQUEST), false);
          }
        } else {
          cb(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        }
      },
    };
  }
}