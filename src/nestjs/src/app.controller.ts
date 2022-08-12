import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//import { CreateCategoryUseCase } from '@fc/micro-videos/category/application';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    //console.log(CreateCategoryUseCase);
    return this.appService.getHello();
  }
}
