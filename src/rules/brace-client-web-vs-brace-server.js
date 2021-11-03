const { SAME_FUNC, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/web/src/utils',
  nameB: '~/Drive/Workspace/brace-server',
  rule: [
    {
      nameA: 'index.js',
      nameB: 'utils.js',
      rule: {
        name: SAME_FUNC,
        exclude: {
          startLine: "  if (!url) return NO_URL;",
          endLine: "  url = ensureContainUrlProtocol(url);",
          name: 'validateUrl',
        },
      },
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
