/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'path';

@Module({})
export class ConfigModule extends NestConfigModule {
    static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
        return super.forRoot({
            envFilePath: [
                ...(Array.isArray(options.envFilePath)
                    ? options.envFilePath
                    : [options.envFilePath]),
                join(__dirname, '../envs/.env'),
            ],
        });
    }
}

// [
//     .env.qualquer - DB_USER=test    // the first takes precedence
//     .env - DB_USER=root
// ]
