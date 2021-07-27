module.exports = {
  extends: ['airbnb-typescript', 'plugin:prettier/recommended', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    'no-plusplus': 'off',
  },
};
