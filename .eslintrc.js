// ESLint配置文件
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 基本规则
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
    'no-undef': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // Vue特定规则
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn'
  }
};
