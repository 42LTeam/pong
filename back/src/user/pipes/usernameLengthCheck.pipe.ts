import {
    PipeTransform,
    Injectable,
    BadRequestException,
  } from "@nestjs/common";
  
  @Injectable()
  export class UsernameLengthValidationPipe implements PipeTransform {
  
    transform(value: any): any {
      if (typeof value !== 'string' || value.length > 16) {
        throw new BadRequestException("Username must be 16 characters or fewer");
      }
      return value;
    }
  }
  