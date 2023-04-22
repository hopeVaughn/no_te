import * as dotenv from 'dotenv';
import app from './server';
import config from './config';
dotenv.config();

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught exception:', err);
  // No process.exit() call, allowing the server to continue running
});

process.on('unhandledRejection', (reason: {} | null | undefined, p: Promise<any>) => {
  console.error('Unhandled rejection at:', p, 'reason:', reason);
  // No process.exit() call, allowing the server to continue running
});

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
