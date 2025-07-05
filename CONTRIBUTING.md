
Contributing to RailBuddy 
We're thrilled you're interested in contributing to RailBuddy! Your contributions, big or small, are incredibly valuable and will help us build a better, safer, and more efficient railway experience.

Before you start, please take a moment to read through these guidelines.

1. Code of Conduct
RailBuddy is committed to fostering a welcoming and inclusive community. Please review our Code of Conduct before participating. All interactions within the RailBuddy project, including contributions, must adhere to this code.

2. How Can I Contribute?
There are many ways to contribute to RailBuddy:

Reporting Bugs
If you find a bug in the RailBuddy application or its documentation, please help us by opening an issue on GitHub (replace with your actual repo link).

When reporting a bug, please include:

A clear and concise description of the bug.

Steps to reproduce the behavior.

Expected behavior.

Screenshots (if applicable).

Your operating system and browser (if a frontend bug).

Suggesting Enhancements
Have an idea for a new feature or an improvement to an existing one? We'd love to hear it!

Check the issues list on GitHub to see if your idea has already been suggested.

If not, open a new issue and clearly describe your suggestion. Explain why it would be beneficial for RailBuddy users or the project itself.

Your First Code Contribution
If you're new to contributing to open source, welcome! We've marked some issues with a good first issue label on GitHub to help you get started. Feel free to pick one up!

Pull Request Guidelines
When you're ready to contribute code, please follow these steps:

Fork the repository and clone it to your local machine.

Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name or git checkout -b bugfix/issue-number.

Make your changes and ensure your code adheres to our Coding Style and Conventions.

Test your changes thoroughly to ensure they don't introduce new bugs or regressions.

Write clear, concise commit messages following our Commit Message Guidelines.

Push your changes to your forked repository.

Open a Pull Request (PR) against the main branch of the RailBuddy repository.

Provide a clear description of your changes in the PR, referencing any related issues.

Be responsive to feedback during the review process.

3. Development Setup
To get RailBuddy up and running for development, you'll need Node.js (for the frontend) and Python (for the backend).

Clone the repository:

Bash

git clone https://github.com/your-username/railbuddy.git
Navigate to the project root:

Bash

cd railbuddy
Backend Setup (Python):

Navigate into the backend directory:

Bash

cd backend
Install Python dependencies:

Bash

pip install -r requirements.txt
Start the backend server (example command, actual command may vary):

Bash

python manage.py runserver # For Django projects
# OR
python app.py # For simple Flask/FastAPI apps
(If your backend also uses npm for specific tooling or scripts, run npm install and then npm run [script_name] or npm start in this directory as well.)

Frontend Setup (JavaScript/Node.js):

Navigate into the frontend directory:

Bash

cd ../frontend
Install Node.js dependencies:

Bash

npm install
Start the frontend development server:

Bash

npm start
# OR
npm run dev # Common for Vite/Next.js
Ensure Database & Redis are Running: Make sure any configured database (e.g., PostgreSQL, MySQL) and Redis instances are active as per your project's configuration documentation.

4. Coding Style and Conventions
Python (Backend): Adhere to PEP 8 style guidelines. We recommend using a linter like flake8 or pylint.

JavaScript (Frontend): Follow a consistent style. We recommend using ESLint with a popular configuration (e.g., Airbnb, Standard).

Consistency: Above all, maintain consistency with the existing codebase.

Clarity: Write clean, readable, and well-commented code.

5. Commit Message Guidelines
We use a simplified version of Conventional Commits. Please make your commit messages clear and descriptive.

Type: feat (new feature), fix (bug fix), docs (documentation only changes), style (formatting, missing semi colons, etc.; no code change), refactor (refactoring production code), test (adding missing tests, refactoring tests; no production code change), chore (updating grunt tasks etc.; no production code change)

Scope: Optional, describe the part of the codebase affected (e.g., frontend, backend-matching, docs).

Subject: Concise, imperative mood (e.g., "add new feature," not "added new feature").

Examples:

feat(frontend): implement dynamic seat selection UI

fix(backend-matching): resolve PNR verification edge case

docs: update contributing guidelines

chore: update dependencies in package.json
