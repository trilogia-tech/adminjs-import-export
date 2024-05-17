1. created with @adminjs/cli. choose `fastify` adapter, then `sequelize` database adapter, then `postgres` database client

2. setted devdependencies to

```json
{
  "devDependencies": {
    "@dotenvx/dotenvx": "^0.39.0",
    "@eslint/js": "^9.2.0",
    "@ianvs/prettier-plugin-sort-imports": "^4.2.1",
    "@types/node": "^20.12.12",
    "@typescript-eslint/eslint-plugin": "^7.9.0",
    "@typescript-eslint/parser": "^7.9.0",
    "eslint": "^9.2.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "prettier": "^3.2.5",
    "sequelize-cli": "^6.6.2",
    "typescript": "^5.4.5",
    "typescript-eslint": "^7.9.0"
  }
}
```

3. Added a sample of each kind of export feature
- export a resource: /src/db/models/user.ts
- export a record: /src/db/models/role.ts
- export many records: /src/db/models/permission.ts
