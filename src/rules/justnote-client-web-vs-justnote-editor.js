const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/justnote-client/packages/web',
  nameB: '~/Drive/Workspace/justnote-editor-in-webview',
  rule: [
    { name: ['postcss.config.js'], rule: SAME_FILE },
    {
      name: 'tailwind_config.js',
      rule: {
        name: SAME_FILE,
        include: {
          startLine: '      fontFamily: {',
          endLine: '        green: colors.green,',
        },
      },
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
