/* eslint-disable no-console */
import mongoose, { Connection } from 'mongoose';

export type DatabaseOptions = Partial<{
  url: string;
}>;

const { DATABASE_URL } = process.env;
const isProd = process.env.NODE_ENV === 'production';
const DEV_URI_FALLBACK = 'mongodb://localhost:27017/resume';

export async function connect({
  url = DATABASE_URL,
}: DatabaseOptions = {}): Promise<Connection> {
  if (!url && isProd) {
    throw new Error(
      'Database not set. Please, set DATABASE_URL environment variable'
    );
  }

  const { connection } = await mongoose.connect(url ?? DEV_URI_FALLBACK, {
    appName: 'Resume',
    wtimeoutMS: isProd ? 25_000 : 0,
    socketTimeoutMS: 30_000 * 3,
    maxPoolSize: 200,
    keepAlive: true,
    keepAliveInitialDelay: 300_000,
  });

  return connection;
}

export async function disconnect(connection: Connection): Promise<Connection> {
  await connection.close();

  return connection;
}

export async function cleanUp(connection: Connection): Promise<Connection> {
  try {
    await connection.dropDatabase();
  } catch (err) {
    console.error('Cannot clean the database');
    console.error('%o', err);
  }

  return connection;
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

export async function effect<T>(fun: () => Promise<T>): Promise<T> {
  const connection = await connect();
  const result = await fun();
  await disconnect(connection);

  return result;
}
