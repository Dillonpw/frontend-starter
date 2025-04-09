import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '../public/vite.svg';
import { Button } from './components/ui/button';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="flex items-center space-x-12">
                        <a
                            href="https://vite.dev"
                            target="_blank"
                            className="transition-transform hover:scale-110"
                        >
                            <img
                                src={viteLogo}
                                className="h-24 w-24"
                                alt="Vite logo"
                            />
                        </a>
                        <a
                            href="https://react.dev"
                            target="_blank"
                            className="transition-transform hover:scale-110"
                        >
                            <img
                                src={reactLogo}
                                className="h-24 w-24 animate-spin-slow"
                                alt="React logo"
                            />
                        </a>
                        <a
                            href="https://tailwindcss.com"
                            target="_blank"
                            className="transition-transform hover:scale-110 mt-12"
                        >
                            <svg
                                className="h-26 w-26 md:h-32 md:w-32"
                                viewBox="0 0 50 50"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                                    fill="#38bdf8"
                                ></path>
                            </svg>
                        </a>
                    </div>

                    <h1 className="text-4xl font-bold text-foreground">
                        Vite + React + Tailwind + shadcn/ui
                    </h1>

                    <div className="rounded-lg bg-card p-8 shadow-lg">
                        <Button
                            onClick={() => setCount((count) => count + 1)}
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Count is {count}
                        </Button>

                        <p className="mt-4 text-muted-foreground">
                            Edit{' '}
                            <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                src/App.tsx
                            </code>{' '}
                            and save to test HMR
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Click on the logos to learn more about each technology
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
