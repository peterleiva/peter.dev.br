/* eslint-disable no-console */
import mongoose, { Connection } from 'mongoose';
import { env } from 'node-environment';

export type DatabaseOptions = Partial<{
  url: string;
}>;

const { DATABASE_URL } = process.env;
const isProd = env('prod');
const DEV_URI_FALLBACK = 'mongodb://localhost:27017/resume';

let db = global.db;

export async function connect({
  url = DATABASE_URL,
}: DatabaseOptions = {}): Promise<Connection> {
  if (!url && isProd) {
    throw new Error(
      'Database not set. Please, set DATABASE_URL environment variable'
    );
  }

  if (db) {
    return db;
  }

  ({ connection: db } = await mongoose.connect(url ?? DEV_URI_FALLBACK, {
    appName: 'Resume',
    wtimeoutMS: isProd ? 25_000 : 0,
    socketTimeoutMS: 30_000 * 3,
    maxPoolSize: 200,
    keepAlive: true,
    keepAliveInitialDelay: 300_000,
    bufferCommands: false,
  }));

  global.db = db;

  return db;
}

export async function disconnect(): Promise<Connection | undefined> {
  await db?.close();

  return db;
}

export async function cleanUp(): Promise<Connection | undefined> {
  try {
    await db?.dropDatabase();
  } catch (err) {
    console.error('Cannot clean the database');
    console.error('%o', err);
  }

  return db;
}

export function log(connection: Connection): Connection {
  mongoose.connection.on('connected', () => {
    const { host, port, name: db } = connection;
    const connectionUri = `${host}:${port}/${db}`;
    console.info(`Database connected at ${connectionUri}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.info(`🆘 Database lost connection`);
  });

  mongoose.connection.on('error', error => {
    console.error(error);
  });

  return connection;
}
