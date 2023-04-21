import * as dotenv from 'dotenv';
import app from './server';

dotenv.config();

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught exception:', err);
  // No process.exit() call, allowing the server to continue running
});

process.on('unhandledRejection', (reason: {} | null | undefined, p: Promise<any>) => {
  console.error('Unhandled rejection at:', p, 'reason:', reason);
  // No process.exit() call, allowing the server to continue running
});

app.listen(3001, () => {
  console.log('server listening on http://localhost:3001');
});
