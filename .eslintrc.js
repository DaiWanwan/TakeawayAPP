module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    //  允许箭头函数前面没有括号
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    //  开发环境允许debugger，生产环境不允许debugger。
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi':['error','always'],
    //  设置为0表示不需要
    'indent':0,
    'space-before-function-paren': 0
  }
}
