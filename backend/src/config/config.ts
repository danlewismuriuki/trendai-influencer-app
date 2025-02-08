import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('Missing MONGO_URI in .env file');
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
};
