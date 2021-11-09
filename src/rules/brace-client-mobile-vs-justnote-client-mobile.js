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
    { name: 'src', rule: srcRule() },
    { name: '*', rule: IGNORE },
  ],
});

const srcRule = () => ([
  {
    name: 'compoments',
    rule: [
      {
        name: 'SignUpPopup',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import { popupOpenAnimConfig, popupCloseAnimConfig } from '../types/animConfigs';",
              lineB: "import { popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "      Animated.timing(popupAnim, { toValue: 1, ...popupOpenAnimConfig }).start();",
              lineB: "      Animated.timing(popupAnim, { toValue: 1, ...popupFMV.visible }).start();",
            },
            {
              lineA: "      Animated.timing(popupAnim, { toValue: 0, ...popupCloseAnimConfig }).start(() => {",
              lineB: "      Animated.timing(popupAnim, { toValue: 0, ...popupFMV.hidden }).start(() => {",
            },
          ],
        },
      },
      {
        name: 'SignInPopup',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import { popupOpenAnimConfig, popupCloseAnimConfig } from '../types/animConfigs';",
              lineB: "import { popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "      Animated.timing(popupAnim, { toValue: 1, ...popupOpenAnimConfig }).start();",
              lineB: "      Animated.timing(popupAnim, { toValue: 1, ...popupFMV.visible }).start();",
            },
            {
              lineA: "      Animated.timing(popupAnim, { toValue: 0, ...popupCloseAnimConfig }).start(() => {",
              lineB: "      Animated.timing(popupAnim, { toValue: 0, ...popupFMV.hidden }).start(() => {",
            },
          ],
        },
      },
      { name: '*', rule: IGNORE },
    ],
  },
  {
    name: 'utils',
    rule: [
      { name: 'cache.js', rule: SAME_FILE },
      { name: ['index.js', 'obj.js'], rule: IGNORE },
    ],
  },
  { name: '*', rule: IGNORE },
]);

module.exports = root();
