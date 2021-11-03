const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/mobile/ios/Save to Brace',
  nameB: '~/Drive/Workspace/blockstack-ios/Javascript',
  rule: [
    {
      name: ['bigi.js', 'bitcoinjs.js', 'elliptic.js', 'encryption.js', 'keys.js'],
      rule: SAME_FILE,
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
