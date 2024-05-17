const standard = require('prettier-config-standard')

// /** @type {import("prettier").Config} */
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  ...standard,
  printWidth: 150,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '<BUILT_IN_MODULES>', '<THIRD_PARTY_MODULES>', '^(?!.*[.]css$)[./].*$', '.css$']
}

module.exports = config
