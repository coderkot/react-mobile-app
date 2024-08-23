module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
