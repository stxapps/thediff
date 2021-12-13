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
        name: 'MenuPopupRenderer.js',
        rule: {
          name: SAME_FUNC,
          include: [
            'axisPosition', 'computePosition', 'createLayouts',
          ],
        },
      },
      {
        name: 'SettingsErrorPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: '    <div className="fixed top-14 inset-x-0 flex justify-center items-start z-40 md:top-0">',
              lineB: '    <div className="fixed top-14 inset-x-0 flex justify-center items-start md:top-0">',
            },
            {
              lineA: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded hover:text-red-800 focus:outline-none focus:ring" href="/#support">contact us',
              lineB: '            <p className="mt-2.5 text-sm text-red-700">Please wait a moment and try again. <br className="hidden sm:inline" />If the problem persists, please <a className="underline rounded hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-700" href="/support">contact us',
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
              lineA: "import { moveListName, updateListNameEditors, updatePopup } from '../actions';",
              lineB: "import { moveListName, updateListNameEditors, updatePopupUrlHash } from '../actions';",
            },
            {
              lineA: "  SETTINGS_LISTS_MENU_POPUP, LIST_NAMES_POPUP, MY_LIST, TRASH, ARCHIVE, MODE_EDIT,",
              lineB: "  SETTINGS_LISTS_MENU_POPUP, LIST_NAMES_POPUP, MY_NOTES, TRASH, ARCHIVE, MODE_EDIT,",
            },
            {
              lineA: "import { popupBgFMV, getPopupFMV } from '../types/animConfigs';",
              lineB: "import { popupBgFMV, popupFMV } from '../types/animConfigs';",
            },
            {
              lineA: "import { computePosition, createLayouts } from './MenuPopupRenderer';",
              lineB: "import { computePosition, createLayouts, getOriginClassName } from './MenuPopupRenderer';",
            },
            {
              lineA: "    dispatch(updatePopup(SETTINGS_LISTS_MENU_POPUP, false, null));",
              lineB: "    updatePopupUrlHash(SETTINGS_LISTS_MENU_POPUP, false, null);",
            },
            {
              startLine: "  const onMoveToBtnClick = () => {",
              endLine: "  };",
            },
            {
              lineA: '      {![MY_LIST, TRASH, ARCHIVE].includes(selectingListName) && <button onClick={onDeleteBtnClick} className="group w-full flex items-center px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">',
              lineB: '      {![MY_NOTES, TRASH, ARCHIVE].includes(selectingListName) && <button onClick={onDeleteBtnClick} className="group w-full flex items-center px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">',
            },
            {
              lineA: "  let popupClassNames = 'fixed w-36 mt-1 rounded-md shadow-xl bg-white overflow-auto ring-1 ring-black ring-opacity-5 z-41';",
              lineB: "  let popupClassNames = 'fixed w-36 mt-1 rounded-md shadow-xl bg-white overflow-auto ring-1 ring-black ring-opacity-5';",
            },
            {
              startLine: "    const popupStyle = { top, left, maxHeight };",
              endLine: "    panel = (",
            },
            {
              lineA: '      <motion.button key="SLMP_cancelBtn" ref={cancelBtn} onClick={onCancelBtnClick} className="fixed inset-0 w-full h-full bg-black opacity-25 cursor-default z-40 focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
              lineB: '      <motion.button key="SLMP_cancelBtn" ref={cancelBtn} onClick={onCancelBtnClick} className="fixed inset-0 w-full h-full bg-black bg-opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
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
              lineA: "  updateDeletingListName, updateListNameEditors, updatePopup,",
              lineB: "  updateDeletingListName, updateListNameEditors, updatePopupUrlHash,",
            },
            {
              lineA: "import { spListsFMV } from '../types/animConfigs';",
              lineB: "import { listsFMV } from '../types/animConfigs';",
            },
            {
              lineA: '          <span className="text-sm text-gray-500 rounded group-focus:ring">{\'<\'} <span className="group-hover:underline">Settings</span></span>',
              lineB: '          <span className="text-sm text-gray-500 rounded-sm group-focus:ring-2 group-focus:ring-gray-400">{\'<\'} <span className="group-hover:underline">Settings</span></span>',
            },
            {
              lineA: '                <motion.div key={listNameObj.listName} layoutId={listNameObj.listName} variants={spListsFMV} initial="hidden" animate="visible" exit="exit">',
              lineB: '                <motion.div key={listNameObj.listName} layoutId={listNameObj.listName} variants={listsFMV} initial="hidden" animate="visible" exit="exit">',
            },
            {
              lineA: "    dispatch(updatePopup(SETTINGS_LISTS_MENU_POPUP, true, rect));",
              lineB: "    updatePopupUrlHash(SETTINGS_LISTS_MENU_POPUP, true, rect);",
            },
            {
              lineA: "        const canDeletes = await canDeleteListNames(listNames);",
              lineB: "        const canDeletes = await dataApi.canDeleteListNames(listNames);",
            },
            {
              lineA: "        dispatch(updatePopup(CONFIRM_DELETE_POPUP, true));",
              lineB: "        updatePopupUrlHash(CONFIRM_DELETE_POPUP, true);",
            },
            {
              lineA: '          <div className="w-3.5 h-3.5 flex justify-center items-center text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4">',
              lineB: '          <div className="w-3.5 h-3.5 flex justify-center items-center text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400">',
            },
            {
              lineA: '          <svg style={{ width: \'0.875rem\', height: \'0.875rem\' }} className="text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg style={{ width: \'0.875rem\', height: \'0.875rem\' }} className="text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
            {
              lineA: '          <svg className="w-3 h-3 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg className="w-3 h-3 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
            {
              lineA: '          <svg className="w-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 14 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg className="w-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 14 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
            {
              lineA: '          <svg className="w-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg className="w-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
            {
              lineA: '          <svg className="h-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg className="h-4 text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
            {
              lineA: '          <svg style={{ width: \'1.2rem\', height: \'1.2rem\' }} className="text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring group-focus:ring-offset-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '          <svg style={{ width: \'1.2rem\', height: \'1.2rem\' }} className="text-gray-500 rounded-sm group-hover:text-gray-600 group-focus:ring-2 group-focus:ring-offset-4 group-focus:ring-gray-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
          ],
        },
      },
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
