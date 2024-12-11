// Note: Knex uses a connection pool, so there is no need to use the singleton pattern.

/**
 * Initializes and configures a Knex.js database connection.
 *
 * @constant
 * @type {object}
 * @property {string} client - The database client being used (PostgreSQL).
 * @property {object} connection - The connection details for the database.
 * @property {string} connection.host - The hostname of the database server.
 * @property {number} connection.port - The port number on which the database server is running.
 * @property {string} connection.user - The username for authenticating with the database.
 * @property {string} connection.password - The password for authenticating with the database.
 * @property {string} connection.database - The name of the database to connect to.
 */
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
