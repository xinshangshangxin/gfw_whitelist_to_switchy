module.exports = {
  extends: 'airbnb-base',
  plugins: [],
  globals: {
    logger: false,
    Promise: false,
  },
  rules: {
    'arrow-body-style': ['error', 'always'],
    'brace-style': ['error', 'stroustrup'],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
      },
    ],
    'no-console': ['off'],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'prefer-const': ['off'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'ignore',
      },
    ],
  },
};
