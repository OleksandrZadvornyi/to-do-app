# SimplyDone

A modern, minimalist To-Do application built to demonstrate clean React architecture, type-safe development practices, and automated end-to-end testing.

## Features

### Application Features

- **CRUD Operations:** Create, Read, Update (via double-click or edit button), and Delete tasks.
- **Filtering:** Toggle between All, Active, and Completed tasks.
- **Persistence:** Automatically saves data to `localStorage` so data persists across reloads.
- **Modern UI:** Responsive design using the latest TailwindCSS v4.

### Developer Experience & DevOps

- **End-to-End Testing:** Automated browser testing using WebdriverIO.
- **Code Quality:** Configured with ESLint, Prettier, Husky, and Commitlint.
- **CI/CD:** Automated semantic releases via GitHub Actions.

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4
- **Testing:** WebdriverIO (E2E)
- **Tooling:** ESLint, Prettier, Husky, Semantic Release

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

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
    The app will be available at `http://localhost:5173`.

## scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run wdio`: Runs the WebdriverIO end-to-end test suite.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run format`: Formats code using Prettier.

## Testing

This project uses **WebdriverIO** for end-to-end testing to ensure critical user flows work as expected.

### Running Tests

Ensure the development server is running in one terminal (or configure WDIO to launch it automatically), then run:

```bash
npm run wdio
```

### Test Coverage

The E2E suite covers the following scenarios:

- Adding new todo items.
- Marking items as completed/active.
- Editing items via double-click interactions.
- Deleting items.
- Filtering lists by status (Active/Completed).

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── release.yml      # GitHub Actions CI/CD configuration
├── .husky/                  # Git hooks (pre-commit, commit-msg)
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx     # Input component
│   │   └── TodoItem.tsx     # Individual list item component
│   ├── App.tsx              # Main application logic
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind directives
├── test/
│   ├── pageobjects/         # Page Object Model (POM) classes
│   │   ├── page.ts
│   │   └── todo.page.ts
│   └── specs/
│       └── test.e2e.ts      # E2E test definitions
├── .releaserc               # Semantic Release config
├── package.json
├── vite.config.ts
└── wdio.conf.ts             # WebdriverIO configuration
```

## Contributing

This project enforces **Conventional Commits** via Husky hooks. Please ensure your commit messages follow the standard to ensure the automated release pipeline functions correctly.

**Examples:**

- `feat: add local storage persistence`
- `fix: resolve layout issue on mobile`
- `test: add webdriverio configuration`

## License

MIT
