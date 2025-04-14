#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateDir = join(__dirname, '..');

function createApp(projectName) {
    console.log(`Creating a new React app in ${projectName}...`);

    // Create the project directory
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Copy template files
    const filesToCopy = [
        'src',
        'public',
        'index.html',
        'vite.config.ts',
        'tsconfig.json',
        'tsconfig.node.json',
        'components.json',
    ];

    filesToCopy.forEach((file) => {
        execSync(`cp -r ${join(templateDir, file)} .`, { stdio: 'inherit' });
    });

    // Create a new package.json
    const packageJson = {
        name: projectName,
        version: '0.0.0',
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'tsc -b && vite build',
            preview: 'vite preview',
        },
        dependencies: {
            '@radix-ui/react-slot': '^1.2.0',
            'class-variance-authority': '^0.7.1',
            clsx: '^2.1.1',
            'lucide-react': '^0.487.0',
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            'tailwind-merge': '^3.2.0',
            tailwindcss: '^4.1.3',
            '@tailwindcss/vite': '^4.1.3', // Added this line to fix the missing dependency
            'tw-animate-css': '^1.2.5',
        },
        devDependencies: {
            '@types/node': '^22.14.0',
            '@types/react': '^19.0.10',
            '@types/react-dom': '^19.0.4',
            '@vitejs/plugin-react': '^4.3.4',
            typescript: '~5.7.2',
            vite: '^6.2.0',
        },
    };

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

✨ What's included:
  • React 19 with TypeScript
  • Vite for fast development
  • Tailwind CSS for styling
  • shadcn/ui components

To add more components, run:
  npx shadcn@latest add [component]

🚀 Getting started:
  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm run preview
    Preview the production build locally.

📝 Next steps:
  1. cd ${projectName}
  2. npm run dev
  3. Edit src/App.tsx to start building your app

Happy coding! 🎉
    `);
}

const projectName = process.argv[2];

if (!projectName) {
    console.log('Please specify the project name:');
    console.log('  npx create-dillonpw-app my-app');
    process.exit(1);
}

createApp(projectName);