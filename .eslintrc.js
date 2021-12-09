module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/html-self-closing': [0]
  }
}
