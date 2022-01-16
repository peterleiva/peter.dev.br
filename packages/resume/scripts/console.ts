import repl from 'repl';
// const repl = require('repl');
// const { connect, disconnect } = require('lib/database');
// const factories = require('test/factories');
import { connect, disconnect } from 'src/lib/database';
import * as factories from 'test/factories';

async function start() {
  const connection = await connect();

  const console = repl.start({
    prompt: 'resume > ',
  });

  console.context.factories = factories;
  console.context.db = connection;
  console.context.database = console.context.db;

  for (const model in connection?.models) {
    console.context[model] = connection?.models[model];
  }

  console.on('exit', async () => disconnect(connection));
}

start();
