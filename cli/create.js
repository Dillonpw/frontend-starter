#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import readline from 'readline';

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
        'assets',
        'index.html',
        'vite.config.ts',
        'tsconfig.json',
        'tsconfig.node.json',
        'components.json',
        '.prettierrc',
    ];

    filesToCopy.forEach((file) => {
        const sourcePath = join(templateDir, file);
        if (fs.existsSync(sourcePath)) {
            execSync(`cp -r ${sourcePath} .`, { stdio: 'inherit' });
        } else {
            console.warn(`Warning: ${file} not found in template, skipping...`);
        }
    });

    // Create .gitignore file directly
    const gitignoreContent = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build output
build/
out/

# Coverage directory
coverage/

# Temporary files
*.tmp
*.temp
.cache/
`;
    fs.writeFileSync('.gitignore', gitignoreContent);

    // Create a new package.json
    const packageJson = {
        name: projectName,
        version: '0.0.0',
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'tsc -b && vite build',
            preview: 'vite preview',
            format: 'prettier --write .',
            'format:check': 'prettier --check .'
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
            '@tailwindcss/vite': '^4.1.3',
            'tw-animate-css': '^1.2.5',
        },
        devDependencies: {
            '@types/node': '^22.14.0',
            '@types/react': '^19.0.10',
            '@types/react-dom': '^19.0.4',
            '@vitejs/plugin-react': '^4.3.4',
            'prettier': '^3.2.5',
            'prettier-plugin-tailwindcss': '^0.5.12',
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

    // Force add the .gitignore file to ensure it's tracked
    execSync('git add -f .gitignore', { stdio: 'inherit' });

    // Add all other files
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit"', { stdio: 'inherit' });

    console.log(`
Success! Created ${projectName} at ${process.cwd()}

✨ What's included:
  • React 19 with TypeScript
  • Vite for fast development
  • Tailwind CSS for styling
  • shadcn/ui components
  • Prettier with Tailwind plugin for code formatting

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
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('What is your project name? ', (name) => {
        rl.close();
        if (!name) {
            console.log('Project name cannot be empty. Please try again.');
            process.exit(1);
        }
        createApp(name);
    });
} else {
    createApp(projectName);
}
