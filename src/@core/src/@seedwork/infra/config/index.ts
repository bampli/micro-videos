import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Config = {
    db: {
        vendor: any,
        host: string,
        logging: boolean
    }
}

function makeConfig(envFile): Config {
    const output = readEnv({ path: envFile });  // read .env file into process.env

    // console.log(readEnv({ path: envFile }));
    // {parsed: { DB_VENDOR: 'sqlite', DB_HOST: ':memory:', DB_LOGGING: 'false' }}

    return {
        db: {
            vendor: output.parsed.DB_VENDOR as any,   // any avoids error in db.ts
            host: output.parsed.DB_HOST,
            logging: output.parsed.DB_LOGGING === 'true'
        },
    };
};

//export const config = makeConfig(envTestFile);

const envTestFile = join(__dirname, '../../../../.env.test');
export const configTest = makeConfig(envTestFile);

// NOTE: This approach was too much attached to 'process.env' style:
// readEnv({ path: envTestFile });  // read .env file into process.env
// export const config = {
//     db: {
//         vendor: process.env.DB_VENDOR as any,   // any avoids error in db.ts
//         host: process.env.DB_HOST,
//         logging: process.env.DB_LOGGING === 'true'
//     },
//     // mail: {
//     // },
//     // storages: {
//     // }
// };

