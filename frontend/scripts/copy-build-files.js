import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the built React files
const buildDir = path.join(__dirname, '../dist');

// Path to the target directory in the Yii2 project
const targetDir = path.resolve(__dirname, '../../web/frontend'); // Adjust this path

console.log(`Build Directory: ${buildDir}`);
console.log(`Target Directory: ${targetDir}`);

// Copy build files to Yii2 project
fs.copy(buildDir, targetDir, { overwrite: true })
  .then(() => console.log('Build files copied successfully!'))
  .catch(err => console.error('Error copying build files:', err));
