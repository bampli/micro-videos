/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

type DB_SCHEMA_TYPE = {
    DB_VENDOR: 'mysql' | 'sqlite';
    DB_HOST: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_LOGGING: boolean;
    DB_AUTO_LOAD_MODULES: boolean;
};

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_TYPE> = {
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
};

export type CONFIG_SCHEMA_TYPE = DB_SCHEMA_TYPE; // && MAIL_SCHEMA_TYPE && CASH_SCHEMA_TYPE

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
            validationSchema: Joi.object({
                ...CONFIG_DB_SCHEMA,
            }),
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
