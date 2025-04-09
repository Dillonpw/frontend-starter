#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateDir = join(__dirname, '..', 'template');

function createApp(projectName) {
    console.log(`Creating a new React app in ${projectName}...`);

    // Create the project directory
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Copy template files
    execSync(`cp -r ${templateDir}/* .`, { stdio: 'inherit' });
    execSync(`cp -r ${templateDir}/.* . 2>/dev/null || true`, {
        stdio: 'inherit',
    });

    // Create a new package.json with the project name
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = projectName;
    packageJson.version = '0.0.0';
    delete packageJson.bin;
    delete packageJson.files;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Initialize git repository
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit"', { stdio: 'inherit' });

    console.log(`
Success! Created ${projectName} at ${process.cwd()}

Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm run preview
    Preview the production build locally.

We suggest that you begin by typing:

  cd ${projectName}
  npm run dev

Happy coding!
    `);
}

const projectName = process.argv[2];

if (!projectName) {
    console.log('Please specify the project name:');
    console.log('  npx create-dillonpw-app my-app');
    process.exit(1);
}

createApp(projectName);
