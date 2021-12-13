const { SAME_FILE, SAME_FUNC, IGNORE } = require('../types/const');

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
    name: 'components',
    rule: [
      {
        name: 'MenuPopupRenderer.js',
        rule: {
          name: SAME_FUNC,
          include: [
            'axisPosition', 'computePosition', 'createLayouts', 'getOriginClassName',
          ],
        },
      },
      {
        name: 'SettingsErrorPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "    <View style={tailwind('absolute top-14 inset-x-0 flex-row justify-center items-start bg-transparent shadow-xl z-40 md:top-0', safeAreaWidth)}>",
              lineB: "    <View style={tailwind('absolute top-14 inset-x-0 flex-row justify-center items-start bg-transparent shadow-xl md:top-0', safeAreaWidth)}>",
            },
            {
              lineA: "              <Text style={tailwind('mt-2.5 text-sm text-red-700 font-normal leading-6')}>Please wait a moment and try again. {safeAreaWidth < SM_WIDTH ? '' : '\\n'}If the problem persists, please <Text onPress={() => Linking.openURL('https://brace.to/#support')} style={tailwind('text-sm text-red-700 font-normal leading-6 underline')}>contact us</Text>",
              lineB: "              <Text style={tailwind('mt-2.5 text-sm text-red-700 font-normal leading-6')}>Please wait a moment and try again. {safeAreaWidth < SM_WIDTH ? '' : '\\n'}If the problem persists, please <Text onPress={() => Linking.openURL('https://justnote.cc/support')} style={tailwind('text-sm text-red-700 font-normal leading-6 underline')}>contact us</Text>",
            },
          ],
        },
      },
      {
        name: 'SettingsListsMenuPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "  SETTINGS_LISTS_MENU_POPUP, LIST_NAMES_POPUP, MY_LIST, TRASH, ARCHIVE, MODE_EDIT,",
              lineB: "  SETTINGS_LISTS_MENU_POPUP, LIST_NAMES_POPUP, MY_NOTES, TRASH, ARCHIVE, MODE_EDIT,",
            },
            {
              lineA: "import { popupOpenAnimConfig, popupCloseAnimConfig } from '../types/animConfigs';",
              lineB: "import { popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "      Animated.spring(popupAnim, { toValue: 1, ...popupOpenAnimConfig }).start();",
              lineB: "      Animated.timing(popupAnim, { toValue: 1, ...popupFMV.visible }).start();",
            },
            {
              lineA: "      Animated.spring(popupAnim, { toValue: 0, ...popupCloseAnimConfig }).start(() => {",
              lineB: "      Animated.timing(popupAnim, { toValue: 0, ...popupFMV.hidden }).start(() => {",
            },
            {
              lineA: "      {![MY_LIST, TRASH, ARCHIVE].includes(selectingListName) && <TouchableOpacity onPress={onDeleteBtnClick} style={tailwind('w-full flex-row items-center px-4 py-3')}>",
              lineB: "      {![MY_NOTES, TRASH, ARCHIVE].includes(selectingListName) && <TouchableOpacity onPress={onDeleteBtnClick} style={tailwind('w-full flex-row items-center px-4 py-3')}>",
            },
            {
              lineA: "    <View style={tailwind('absolute inset-0 bg-transparent shadow-xl z-40')}>",
              lineB: "    <View style={tailwind('absolute inset-0 bg-transparent shadow-xl')}>",
            },
          ],
        },
      },
      {
        name: 'SettingsPopupLists.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import { canDeleteListNames } from '../apis/blockstack';",
              lineB: "import dataApi from '../apis/data';",
            },
            {
              lineA: "import { spListsAnimConfig } from '../types/animConfigs';",
              lineB: "import { swapAnimConfig } from '../types/animConfigs';",
            },
            {
              lineA: "        <Text style={tailwind('pb-2 text-xl text-gray-800 font-medium leading-5')}>Lists</Text>",
              lineB: "        <Text style={tailwind('pb-2 text-xl text-gray-800 font-medium leading-6')}>Lists</Text>",
            },
            {
              lineA: "        <Text style={tailwind('text-base text-gray-800 font-medium leading-4')}>Lists</Text>",
              lineB: "        <Text style={tailwind('text-base text-gray-800 font-medium leading-5')}>Lists</Text>",
            },
            {
              lineA: "      const animConfig = spListsAnimConfig();",
              lineB: "      const animConfig = swapAnimConfig();",
            },
            {
              lineA: "        const canDeletes = await canDeleteListNames(listNames);",
              lineB: "        const canDeletes = await dataApi.canDeleteListNames(listNames);",
            },
          ],
        },
      },
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
    name: 'stylesheets',
    rule: [
      { name: 'tailwind.js', rule: SAME_FILE },
      { name: ['extras.json', 'tailwind.json'], rule: IGNORE },
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
