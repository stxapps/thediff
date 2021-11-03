const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/mobile/ios/Save to Brace',
  nameB: '~/Drive/Workspace/blockstack-ios/Blockstack/Classes',
  rule: [
    {
      name: ['BigInt.swift', 'Encryption.swift', 'Extensions.swift'],
      rule: SAME_FILE,
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
