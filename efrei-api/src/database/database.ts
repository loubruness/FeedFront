// Note: Knex uses a connection pool, so there is no need to use the singleton pattern.

const database = require("knex")({
  client: "pg",
  connection: {
    host: "school-database",
    port: 5432,
    user: "pgsql_school",
    password: "pgsql_pass",
    database: "school",
  },
});

export default database;
