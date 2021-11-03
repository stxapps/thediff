const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-server',
  nameB: '~/Drive/Workspace/brace-server-worker',
  rule: [
    { name: ['const.js', 'utils.js'], rule: SAME_FILE },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
