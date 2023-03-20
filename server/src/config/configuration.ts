import { User } from '../user/entities/user.entity';
import * as process from 'process';

export const config = () => ({
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
    logging: process.env.DATABASE_LOGGING,
    entities: [User],
    migrations: [],
    subscribers: [],
  },
});
