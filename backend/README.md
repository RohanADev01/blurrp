Start the development server:
npm run dev

To run a script, use a PostgreSQL command-line tool:
psql -U your_pg_username -d your_database_name -f scripts/create_tables.sql

Generate Migration File (generates in migrations/ folder):
npx node-pg-migrate create create-users-table

Run the migrations (executes the 'up' function in the generated migration file, creating the tables):
npx node-pg-migrate up
[Also added to package.json: npm run migrate]