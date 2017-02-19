const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  'rules': {
    'semi': [ERROR, 'never'],
    'no-param-reassign': [ERROR, {'props': false}],
    'no-cond-assign': [ERROR, 'except-parens'],
    'comma-dangle': [ERROR, {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'only-multiline',
    }],
  }
}
