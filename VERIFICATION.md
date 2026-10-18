# Backend Verification

The backend CI workflow runs dependency installation, migration generation and consistency checks, migration application to a clean SQLite database, Django system checks, and the project's Django test suite.

Results are written by CI after the commands run. Do not treat source inspection or syntax compilation as a passing Django runtime test.
