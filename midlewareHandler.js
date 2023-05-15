import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const middlewareDir = path.join(__dirname, 'server/midlewares');

const importMiddlewares = async () => {
  const middlewareFiles = await fs.promises.readdir(middlewareDir);
  const middlewareArray = [];

  for (const file of middlewareFiles) {
    const middleware = await import(`./server/midlewares/${file}`);
    middlewareArray.push(middleware.default);
  }

  return middlewareArray;
};

export default importMiddlewares;
