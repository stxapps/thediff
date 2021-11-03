const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/mobile',
  nameB: '~/Drive/Workspace/justnote-client/packages/mobile',
  rule: [
    {
      name: 'bin',
      rule: [
        { name: 'export-stacks-access-as-string.js', rule: SAME_FILE },
        { name: 'export-ckeditor-as-string.js', rule: IGNORE },
      ],
    },
    {
      name: [
        'babel.config.js', 'jsconfig.json', 'metro.config.js', 'react-native.config.js',
        '.eslintrc.js', '.prettierrc.js',
      ],
      rule: SAME_FILE,
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
