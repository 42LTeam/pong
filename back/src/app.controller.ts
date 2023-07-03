import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor) // automatically cache the response
  @CacheTTL(30) // sets the TTL to 30 seconds
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
