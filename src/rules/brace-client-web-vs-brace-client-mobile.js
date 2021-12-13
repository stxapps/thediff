const { SAME_FILE, SAME_FUNC, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/web',
  nameB: '~/Drive/Workspace/brace-client/packages/mobile',
  rule: [
    { name: 'jsconfig.json', rule: SAME_FILE },
    {
      name: 'tailwind.config.js',
      rule: {
        name: SAME_FILE,
        include: {
          startLine: "      colors: {",
          endLine: "        '51': '51',",
        },
      },
    },
    {
      name: 'tailwind.css',
      rule: {
        name: SAME_FILE,
        include: {
          startLine: "  .bg-orange-300 {",
          endLine: "    background-color: rgba(19, 78, 74, var(--tw-bg-opacity));",
        },
      },
    },
    { name: 'src', rule: srcRule() },
    { name: '*', rule: IGNORE },
  ],
});

const srcRule = () => ([
  {
    name: 'actions',
    rule: [
      { name: 'index.js', rule: actionsIndexJsRule() },
    ],
  },
  {
    name: 'apis',
    rule: [
      {
        name: 'blockstack.js',
        rule: {
          name: SAME_FILE,
          exclude: {
            lineA: "      userSession.putFile(fpath, contents[i], { dangerouslyIgnoreEtag: true })",
            lineB: "      userSession.putFile(fpath, contents[i])",
          },
        },
      },
      {
        name: 'customOffline.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            { lineA: "", lineB: "import userSession from '../userSession';" },
            {
              lineA: "",
              startLineB: "  peek(array, item, context) {", endLineB: "  },",
            },
          ],
        },
      },
      { name: 'wallet.js', rule: IGNORE },
    ],
  },
  {
    name: 'components',
    rule: [
      {
        name: 'MenuPopupRenderer.js',
        rule: {
          name: SAME_FUNC,
          include: ['axisPosition', 'computePosition'],
        },
      },
      { name: '*', rule: IGNORE },
    ],
  },
  { name: 'reducers', rule: [{ name: '*', rule: SAME_FILE }] },
  { name: 'selectors', rule: [{ name: 'index.js', rule: SAME_FILE }] },
  {
    name: '@types',
    rule: [
      { name: ['custom.d.ts', 'react-redux.d.ts'], rule: SAME_FILE },
    ],
  },
  {
    name: 'types',
    rule: [
      { name: ['actionTypes.js', 'const.js', 'initialStates.js'], rule: SAME_FILE },
      { name: ['animConfigs.js', 'imagePaths.js', 'patternPaths.js'], rule: IGNORE },
    ],
  },
  {
    name: 'utils',
    rule: [
      { name: 'index.js', rule: SAME_FILE },
      { name: 'cache.js', rule: IGNORE },
    ],
  },
  { name: '*', rule: IGNORE },
]);

const actionsIndexJsRule = () => ({
  name: SAME_FILE,
  exclude: [
    {
      startLineA: "import { RESET_STATE as OFFLINE_RESET_STATE } from '@redux-offline/redux-offline/lib/constants';",
      endLineA: "export const updatePopup = (id, isShown, anchorPosition = null) => {",
      startLineB: "import { Linking, Dimensions, Platform } from 'react-native';",
      endLineB: "export const updatePopup = (id, isShown, anchorPosition = null) => {",
    },
    {
      lineA: "  const pageYOffset = window.pageYOffset;",
      lineB: "  const pageYOffset = getState().window.pageYOffset;",
    },
    {
      lineA: "",
      lineB: "      { headers: { Referer: DOMAIN_NAME } }",
    },
    {
      startLineA: "    var blob = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' });",
      endLineA: "    saveAs(blob, 'brace-data.txt');",
      startLineB: "    // This will write the file to an app directory, not shared.",
      endLineB: "    //await RNFS.writeFile(path, JSON.stringify(data), 'utf8');",
    },
  ],
});

module.exports = root();
