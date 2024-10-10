import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'style/brace-style': ['error', '1tbs'],
    'no-console': 'off',
  },
  stylistic: {
    semi: true,
  },
});
