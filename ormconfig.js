module.exports = {
  "type": "mysql",
  "url": process.env.DB_URL,
  //"synchronize": true,
  "logging": true,
  "entities": ["src/entities/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
