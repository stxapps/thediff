const { SAME_FILE, SAME_FUNC, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/web',
  nameB: '~/Drive/Workspace/justnote-client/packages/web',
  rule: [
    { name: 'bin', rule: { name: '*', rule: SAME_FILE } },
    { name: ['jsconfig.json', 'postcss.config.js', '.dir-locals.el'], rule: SAME_FILE },
    {
      name: 'tailwind.config.js',
      rule: {
        name: SAME_FILE,
        exclude: [
          {
            startLine: "        green: colors.green,",
            endLine: "  plugins: [",
          },
        ],
      },
    },
    {
      name: 'tailwind.css',
      rule: {
        name: SAME_FILE,
        include: [
          {
            startLine: "@tailwind base;",
            endLine: "    -webkit-appearance:none;",
          },
          {
            startLine: "  @font-face {",
            endLine: "}",
          },
          {
            startLine: "  .e-mail:before {",
            endLine: "  }",
          },
        ],
      },
    },
    { name: 'src', rule: srcRule() },
    { name: '*', rule: IGNORE },
  ],
});

const srcRule = () => ([
  { name: 'userSession.js', rule: SAME_FILE },
  {
    name: 'apis',
    rule: [
      {
        nameA: 'blockstack.js',
        nameB: 'data.js',
        rule: {
          name: SAME_FUNC,
          include: [
            'batchGetFileWithRetry', 'batchPutFileWithRetry', 'batchDeleteFileWithRetry',
          ],
        },
      },
      { name: 'wallet.js', rule: SAME_FILE },
      { name: ['customOffline.js', 'file.js'], rule: IGNORE },
    ],
  },
  {
    name: 'components',
    rule: [
      {
        name: 'SignUpPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import { updatePopup, updateUserData } from '../actions';",
              lineB: "import { updatePopupUrlHash, updateUserData } from '../actions';",
            },
            {
              lineA: "import { popupBgFMV, ccPopupFMV } from '../types/animConfigs';",
              lineB: "import { popupBgFMV, popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "    dispatch(updatePopup(SIGN_UP_POPUP, false));",
              lineB: "    updatePopupUrlHash(SIGN_UP_POPUP, false);",
            },
            {
              startLine: "  const onSignInBtnClick = () => {",
              endLine: "  };",
            },
            {
              lineA: '      <div className="fixed inset-0 overflow-hidden z-30">',
              lineB: '      <div className="fixed inset-0 overflow-hidden">',
            },
            {
              lineA: '            <motion.button ref={cancelBtn} onClick={onPopupCloseBtnClick} className="absolute inset-0 w-full h-full bg-black opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
              lineB: '            <motion.button ref={cancelBtn} onClick={onPopupCloseBtnClick} className="absolute inset-0 w-full h-full bg-black bg-opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
            },
            {
              lineA: `          <motion.div className={'w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-xl'} variants={ccPopupFMV} initial="hidden" animate="visible" exit="hidden" role="dialog" aria-modal="true" aria-labelledby="modal-headline">`,
              lineB: `          <motion.div className={'w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-xl'} variants={popupFMV} initial="hidden" animate="visible" exit="hidden" role="dialog" aria-modal="true" aria-labelledby="modal-headline">`,
            },
          ],
        },
      },
      {
        name: 'SignUp.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded-sm hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-700" href="#support">contact us',
              lineB: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded-sm hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-700" href="/support">contact us',
            },
          ],
        },
      },
      {
        name: 'SignInPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import { updatePopup, updateUserData } from '../actions';",
              lineB: "import { updatePopupUrlHash, updateUserData } from '../actions';",
            },
            {
              lineA: "import { popupBgFMV, ccPopupFMV } from '../types/animConfigs';",
              lineB: "import { popupBgFMV, popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "    dispatch(updatePopup(SIGN_IN_POPUP, false));",
              lineB: "    updatePopupUrlHash(SIGN_IN_POPUP, false);",
            },
            {
              startLine: "  const onSignUpBtnClick = () => {",
              endLine: "  };",
            },
            {
              lineA: '      <div className="fixed inset-0 overflow-hidden z-30">',
              lineB: '      <div className="fixed inset-0 overflow-hidden">',
            },
            {
              lineA: '            <motion.button ref={cancelBtn} onClick={onPopupCloseBtnClick} className="absolute inset-0 w-full h-full bg-black opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
              lineB: '            <motion.button ref={cancelBtn} onClick={onPopupCloseBtnClick} className="absolute inset-0 w-full h-full bg-black bg-opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
            },
            {
              lineA: `          <motion.div className={'w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-xl'} variants={ccPopupFMV} initial="hidden" animate="visible" exit="hidden" role="dialog" aria-modal="true" aria-labelledby="modal-headline">`,
              lineB: `          <motion.div className={'w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-xl'} variants={popupFMV} initial="hidden" animate="visible" exit="hidden" role="dialog" aria-modal="true" aria-labelledby="modal-headline">`,
            },
          ],
        },
      },
      {
        name: 'SignIn.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import GracefulImage from 'react-graceful-image';",
              lineB: "",
            },
            {
              lineA: '                  <GracefulImage className="h-full w-full bg-white object-cover" src={userImageUrl} alt={`Profile ${i + 1}`} />',
              lineB: '                  <img className="h-full w-full bg-white object-cover" src={userImageUrl} alt={`Profile ${i + 1}`} />',
            },
            {
              lineA: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded-sm hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-700" href="#support">contact us',
              lineB: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded-sm hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-700" href="/support">contact us',
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
      {
        name: 'loading.css',
        rule: {
          name: SAME_FILE,
          include: [
            { startLine: ".lds-ellipsis {", endLine: "  width: 80px;" },
            { startLine: ".lds-ellipsis div {", endLine: "  position: absolute;" },
            {
              startLine: "  border-radius: 50%;",
              endLine: "    transform: rotate(360deg) scale(.8);",
            },
          ],
        },
      },
      { name: ['patterns.css', 'tailwind.css', 'ckeditor.css'], rule: IGNORE },
    ],
  },
  {
    name: '@types',
    rule: [
      {
        name: 'custom.d.ts',
        rule: {
          name: SAME_FILE,
          exclude: { lineA: "", lineB: "  JustnoteReactWebApp?: any;" },
        },
      },
      { name: 'react-redux.d.ts', rule: SAME_FILE },
    ],
  },
  {
    name: 'utils',
    rule: [
      {
        nameA: 'index.js',
        nameB: 'index.js',
        rule: {
          name: SAME_FUNC,
          exclude: [
            {
              lineA: "  //   - Delete a link",
              lineB: "  //   - Delete a note",
              name: 'getListNameDisplayName',
            },
            {
              lineA: "  //   - Commit delete the link -> cause rerender without the list name!",
              lineB: "  //   - Commit delete the note -> cause rerender without the list name!",
              name: 'getListNameDisplayName',
            },
            {
              lineA: "    DIED_ADDING, DIED_UPDATING, DIED_MOVING, DIED_REMOVING, DIED_DELETING,",
              lineB: "    DIED_ADDING, DIED_UPDATING, DIED_MOVING, DIED_DELETING, DIED_MERGING,",
              name: 'isDiedStatus',
            },
            {
              lineA: "  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';",
              startLineB: "  // Important - characters can't contain numbers",
              endLineB: "  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';",
              name: 'randomString',
            },
            {
              startLineA: "const isStringIn = (link, searchString) => {",
              endLineA: "};",
              startLineB: "const isStringIn = (note, searchString) => {",
              endLineB: "};",
              name: 'isStringIn',
            },
          ]
        },
      },
      { nameA: 'index.js', nameB: 'obj.js', rule: SAME_FUNC },
    ],
  },
  { name: '*', rule: IGNORE },
]);

module.exports = root();
