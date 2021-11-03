const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/mobile/ios/Save to Brace',
  nameB: '~/Drive/Workspace/blockstack-ios/Blockstack/Classes/JS Bridge',
  rule: [
    {
      name: ['BitcoinJS.swift', 'EllipticJS.swift', 'EncryptionJS.swift', 'KeysJS.swift'],
      rule: SAME_FILE,
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
