import { exec } from 'node:child_process';

export function startServer() {
  exec('node /Users/chenkai/Desktop/ai/lumos/src/server/server.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
}
