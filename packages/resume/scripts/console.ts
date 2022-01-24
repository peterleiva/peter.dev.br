import repl from 'repl';
import { connect, disconnect } from 'services/database';
import * as factories from 'test/factories';

async function start(): Promise<void> {
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

  console.on('exit', disconnect);
}

start();
