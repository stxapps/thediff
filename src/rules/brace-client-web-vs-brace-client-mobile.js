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
      { name: 'obj.js', rule: SAME_FILE },
      { name: 'cache.js', rule: IGNORE },
    ],
  },
  { name: 'vars.js', rule: SAME_FILE },
  { name: '*', rule: IGNORE },
]);

const actionsIndexJsRule = () => ({
  name: SAME_FILE,
  exclude: [
    {
      startLineA: "// A first line mark for theDiff",
      endLineA: "  // Stop show loading",
      startLineB: "import { Linking, AppState, Platform } from 'react-native';",
      endLineB: "  // Stop show loading",
    },
    {
      startLineA: "  return getPopupShownId(state) !== null;",
      endLineA: "export const updateStacksAccess = (data) => {",
      startLineB: "  return getPopupShownId(state) !== null;",
      endLineB: "export const updateStacksAccess = (data) => {",
    },
    {
      lineA: "",
      lineB: "let _lastFetchDT = 0;",
    },
    {
      startLine: "        rollback: { type: FETCH_ROLLBACK },",
      endLine: "export const tryUpdateFetched = (payload, meta) => async (dispatch, getState) => {",
    },
    {
      lineA: "    const pageYOffset = window.pageYOffset;",
      lineB: "    const pageYOffset = getState().scrollPanel.pageYOffset;",
    },
    {
      startLine: "    dispatch(updateFetchedMore(payload, meta));",
      endLine: "    if (windowBottom > (scrollHeight * 0.96) && !isPopupShown(getState())) {",
    },
    {
      lineA: "",
      lineB: "      { headers: { Referer: DOMAIN_NAME } }",
    },
    {
      lineA: "  const pageYOffset = window.pageYOffset;",
      lineB: "  const pageYOffset = getState().scrollPanel.pageYOffset;",
    },
    {
      startLineA: "const importAllDataLoop = async (dispatch, fpaths, contents) => {",
      endLineA: "export const updateImportAllDataProgress = (progress) => {",
      startLineB: "export const importAllData = () => async (dispatch, getState) => {",
      endLineB: "export const updateImportAllDataProgress = (progress) => {",
    },
    {
      startLineA: "const exportAllDataLoop = async (dispatch, fpaths, doneCount) => {",
      endLineA: "export const updateExportAllDataProgress = (progress) => {",
      startLineB: "export const exportAllData = () => async (dispatch, getState) => {",
      endLineB: "export const updateExportAllDataProgress = (progress) => {",
    },
    {
      startLine: "    type: UPDATE_DELETE_ALL_DATA_PROGRESS,",
      endLine: "const getIapStatus = async (doForce) => {",
    },
    {
      lineA: "  const sigObj = userSession.signECDSA(SIGNED_TEST_STRING);",
      lineB: "  const sigObj = await userSession.signECDSA(SIGNED_TEST_STRING);",
    },
    {
      lineA: "",
      lineB: "    { headers: { Referer: DOMAIN_NAME } }",
    },
    {
      startLine: "    console.log('Error when contact IAP server to get purchases: ', error);",
      endLine: "export const restorePurchases = () => async (dispatch, getState) => {",
    },
    {
      startLine: "    doCheck = p > Math.random();",
      endLine: "export const updateIapPublicKey = () => async (dispatch, getState) => {",
    },
  ],
});

module.exports = root();
