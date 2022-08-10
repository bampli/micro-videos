/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

const DB_SCHEMA = Joi.object({
    DB_VENDOR: Joi.string().required().valid('mysql', 'sqlite'),
    DB_HOST: Joi.string().required(),
    DB_DATABASE: Joi.string().when('DB_VENDOR', {
        is: 'mysql',
        then: Joi.required(),
    }),
    DB_USERNAME: Joi.string().when('DB_VENDOR', {
        is: 'mysql',
        then: Joi.required(),
    }),
    DB_PASSWORD: Joi.string().when('DB_VENDOR', {
        is: 'mysql',
        then: Joi.required(),
    }),
    DB_PORT: Joi.number().when('DB_VENDOR', {
        is: 'mysql',
        then: Joi.required(),
    }),
    DB_LOGGING: Joi.boolean().required(),
    DB_AUTO_LOAD_MODULES: Joi.boolean().required(),
});

@Module({})
export class ConfigModule extends NestConfigModule {
    static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
        return super.forRoot({
            envFilePath: [
                ...(Array.isArray(options.envFilePath)
                    ? options.envFilePath
                    : [options.envFilePath]),
                join(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
                join(__dirname, '../envs/.env'),
            ],
            validationSchema: DB_SCHEMA,
            ...options,                     // set any other options
        });
    }
}

// [
//     .env.other - DB_USER=test    // the first takes precedence
//     .env       - DB_USER=root
// ]

// NOTE: Dynamic .env with "NODE_ENV" overrides .env default
// NODE_ENV=test
// NODE_ENV=prod
