# SimplyDone

A modern, minimalist To-Do application built to demonstrate clean React architecture and type-safe development practices.

## Features

- **CRUD Operations:** Create, Read, Update (via double-click or edit button), and Delete tasks.
- **Filtering:** Toggle between All, Active, and Completed tasks.
- **Persistence:** Automatically saves data to `localStorage` so you never lose your list.
- **Modern UI:** Responsive design using the latest TailwindCSS v4.
- **Developer Experience:** Configured with ESLint, Husky, and Commitlint for code quality.

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4
- **Tooling:** ESLint, Prettier, Husky, Semantic Release

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/OleksandrZadvornyi/to-do-app.git
    cd simply-done
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Project Structure

```text
.
├── .husky/                  # Git hooks (pre-commit, commit-msg)
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx     # Input and submission logic
│   │   └── TodoItem.tsx     # Individual task display/edit logic
│   ├── App.tsx              # Main application state & layout
│   ├── index.css            # Tailwind directives & global styles
│   └── main.tsx             # Entry point
├── .releaserc               # Semantic Release configuration
├── commitlint.config.cjs    # Commit message linting rules
├── eslint.config.js         # Linting configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite bundler configuration
```

## Contributing

This project enforces **Conventional Commits** via Husky hooks. Please ensure your commit messages follow the standard (e.g., `feat: add filter logic` or `fix: layout issue`).

## License

MIT
