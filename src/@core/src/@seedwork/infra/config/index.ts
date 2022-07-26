import { config as readEnv } from 'dotenv';
import { join } from 'path';

const envTestingFile = join(__dirname, '../../../../.env.testing');

readEnv({ path: envTestingFile });  // read .env file into process.env

export const config = {
    db: {
        vendor: process.env.DB_VENDOR as any,   // any avoids error in db.ts
        host: process.env.DB_HOST,
        logging: process.env.DB_LOGGING === 'true'
    },
    // mail: {

    // },
    // storages: {

    // }
};