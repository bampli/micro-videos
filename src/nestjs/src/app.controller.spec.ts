import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, CONFIG_SCHEMA_TYPE } from './config/config.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, 'envs/.env.test'),
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    const db_vendor = app
      .get<ConfigService<CONFIG_SCHEMA_TYPE>>(ConfigService)
      .get<CONFIG_SCHEMA_TYPE['DB_VENDOR']>('DB_VENDOR');

    //console.log('DB_VENDOR_1', db_vendor);
    //DB_VENDOR_1 sqlite

    // const configService: ConfigService =
    //   app.get<ConfigService<CONFIG_SCHEMA_TYPE>>(ConfigService);
    // const db_vendor = configService.get<CONFIG_SCHEMA_TYPE['DB_VENDOR']>('DB_VENDOR');

    // console.log(
    //   'DB_VENDOR_2',
    //   app.get(ConfigService).get<'mysql' | 'sqlite'>('DB_VENDOR'),
    // );
    //DB_VENDOR_2 sqlite
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
