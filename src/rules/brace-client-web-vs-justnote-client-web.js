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
            lineA: "const colors = require('tailwindcss/colors');",
            lineB: "",
          },
          {
            lineA: "  purge: [",
            lineB: "  content: [",
          },
          {
            startLine: "        sans: ['Inter', ...defaultTheme.fontFamily.sans],",
            endLine: "  plugins: [",
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
              lineA: "  let popupClassNames = 'fixed w-36 rounded-lg bg-white overflow-auto shadow-xl ring-1 ring-black ring-opacity-5 z-41';",
              lineB: "  let popupClassNames = 'fixed w-36 rounded-md shadow-xl bg-white overflow-auto ring-1 ring-black ring-opacity-5';",
            },
            {
              lineA: '      <motion.button key="SLMP_cancelBtn" ref={cancelBtn} onClick={onCancelBtnClick} className="fixed inset-0 w-full h-full bg-black bg-opacity-25 cursor-default z-40 focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
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
              lineA: '          <span className="text-sm text-gray-500 rounded group-focus:ring">{\'<\'} <span className="group-hover:underline">Settings</span></span>',
              lineB: '          <span className="text-sm text-gray-500 rounded-sm group-focus:ring-2 group-focus:ring-gray-400">{\'<\'} <span className="group-hover:underline">Settings</span></span>',
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
        name: 'SettingsPopupIap.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: `          <span className="text-sm text-gray-500 rounded group-focus:ring">{'<'} <span className="group-hover:underline">Settings</span></span>`,
              lineB: `          <span className="text-sm text-gray-500 rounded-sm group-focus:ring-2 group-focus:ring-gray-400">{'<'} <span className="group-hover:underline">Settings</span></span>`,
            },
            {
              startLine: '      <h4 className="text-base text-gray-800 font-medium leading-none">Purchase subscription</h4>',
              endLine: '    </div>',
            },
            {
              lineA: '      <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noreferrer">App Store</a>',
              lineB: '      <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noreferrer">App Store</a>',
            },
            {
              lineA: '      <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href="https://play.google.com/store/account/subscriptions?sku=com.bracedotto.supporter&package=com.bracedotto" target="_blank" rel="noreferrer">Google Play</a>',
              lineB: '      <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href="https://play.google.com/store/account/subscriptions?sku=com.justnotecc.supporter&package=com.justnotecc" target="_blank" rel="noreferrer">Google Play</a>',
            },
            {
              lineA: `    <p className="mt-6 text-base text-gray-500 leading-relaxed">{isUnknown ? 'Please wait a moment and try' : 'If your subscription is not up to date, try'} <button onClick={onRefreshBtnClick} className="underline rounded hover:text-gray-700 focus:outline-none focus:ring">Refresh purchases</button>.</p>`,
              lineB: `    <p className="mt-6 text-base text-gray-500 leading-relaxed">{isUnknown ? 'Please wait a moment and try' : 'If your subscription is not up to date, try'} <button onClick={onRefreshBtnClick} className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">Refresh purchases</button>.</p>`,
            },
            {
              lineA: `      <p className="mt-6 text-base text-gray-500 leading-relaxed">{isUnknown ? 'If the problem persists' : 'If you have any question'}, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
              lineB: `      <p className="mt-6 text-base text-gray-500 leading-relaxed">{isUnknown ? 'If the problem persists' : 'If you have any question'}, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
            },
            {
              lineA: '      <button onClick={onRestoreBtnClick} type="button" className="mt-7 mb-4 px-3.5 py-1.5 block bg-white text-sm text-gray-500 border border-gray-400 rounded-full hover:text-gray-600 hover:border-gray-500 focus:outline-none focus:ring">',
              lineB: '      <button onClick={onRestoreBtnClick} type="button" className="mt-7 mb-4 px-2 py-2 block border border-gray-300 text-sm text-gray-500 rounded-md bg-white shadow-sm hover:text-gray-600 hover:border-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">',
            },
            {
              lineA: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">Please try to restore purchases in our <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href={'/' + HASH_LANDING_MOBILE} target="_blank" rel="noreferrer">Mobile apps</a> where you've made the purchase.</p>`,
              lineB: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">Please try to restore purchases in our <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href={'/' + HASH_LANDING_MOBILE} target="_blank" rel="noreferrer">Mobile apps</a> where you've made the purchase.</p>`,
            },
            {
              lineA: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">If there's still no purchase found, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
              lineB: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">If there's still no purchase found, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
            },
            {
              lineA: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">Please wait a moment and try again. If the problem persists, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
              lineB: `        <p className="mt-6 text-base text-gray-500 leading-relaxed">Please wait a moment and try again. If the problem persists, please <a className="underline rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" href={'/' + HASH_SUPPORT} target="_blank" rel="noreferrer">contact us`,
            },
            {
              lineA: `          <span className="text-sm text-gray-500 rounded group-focus:ring">{'<'} <span className="group-hover:underline">{safeAreaWidth < SM_WIDTH ? 'Settings / ' : ''}Subscription</span></span>`,
              lineB: `          <span className="text-sm text-gray-500 rounded group-focus:ring-2 group-focus:ring-gray-400">{'<'} <span className="group-hover:underline">{safeAreaWidth < SM_WIDTH ? 'Settings / ' : ''}Subscription</span></span>`,
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
      {
        name: 'PaywallPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              startLine: "  if (safeAreaWidth >= SM_WIDTH) spanStyle.height = safeAreaHeight;",
              endLine: "  return (",
            },
            {
              startLineA: '            <div className="mt-5 sm:mt-6 sm:flex sm:justify-center sm:items-center">',
              endLineA: '            </div>',
              startLineB: '            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">',
              endLineB: '            </div>',
            },
            {
              lineA: '      <div className="fixed inset-0 overflow-y-auto z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">',
              lineB: '      <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">',
            },
            {
              lineA: '              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">',
              lineB: '              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">',
            },
            {
              lineA: '                <svg className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
              lineB: '                <svg className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
            },
          ],
        },
      },
      {
        name: 'PinErrorPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "  PIN_LINK_ROLLBACK, UNPIN_LINK_ROLLBACK, MOVE_PINNED_LINK_ADD_STEP_ROLLBACK,",
              lineB: "  PIN_NOTE_ROLLBACK, UNPIN_NOTE_ROLLBACK, MOVE_PINNED_NOTE_ROLLBACK,",
            },
            {
              lineA: "        PIN_LINK_ROLLBACK, UNPIN_LINK_ROLLBACK, MOVE_PINNED_LINK_ADD_STEP_ROLLBACK,",
              lineB: "        PIN_NOTE_ROLLBACK, UNPIN_NOTE_ROLLBACK, MOVE_PINNED_NOTE_ROLLBACK,",
            },
            {
              lineA: '    <div className="fixed top-14 inset-x-0 flex justify-center items-start z-40 md:top-0">',
              lineB: '    <div className="fixed top-14 inset-x-0 flex justify-center items-start md:top-0">',
            },
          ],
        },
      },
      {
        name: 'PinMenuPopup.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              startLineA: "import { updatePopup, unpinLinks, movePinnedLink } from '../actions';",
              endLineA: "} from '../types/const';",
              startLineB: "import { updatePopup, unpinNotes, movePinnedNote } from '../actions';",
              endLineB: "} from '../types/const';",
            },
            {
              lineA: "  const selectingLinkId = useSelector(state => state.display.selectingLinkId);",
              lineB: "  const selectingNoteId = useSelector(state => state.display.selectingNoteId);",
            },
            {
              lineA: "  const layoutType = useSelector(state => state.localSettings.layoutType);",
              lineB: "",
            },
            {
              startLine: "    onCancelBtnClick();",
              endLine: "      console.log(`In PinMenuPopup, invalid text: ${text}`);",
            },
            {
              startLine: '    <AnimatePresence key="AP_pinMenuPopup" />',
              endLine: '  const buttons = (',
            },
            {
              lineA: '        return <button key={text} onClick={() => onMenuPopupClick(text)} className="py-2.5 pl-4 pr-4 block w-full text-sm text-gray-700 text-left truncate rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring focus:ring-inset" role="menuitem">{text}</button>',
              lineB: '        return <button key={text} onClick={() => onMenuPopupClick(text)} className="py-2.5 pl-4 pr-4 block w-full text-sm text-gray-700 text-left truncate rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 focus:ring-inset" role="menuitem">{text}</button>',
            },
            {
              lineA: "  let popupClassNames = 'pb-1 fixed min-w-32 max-w-64 bg-white rounded-lg shadow-xl overflow-auto ring-1 ring-black ring-opacity-5 z-41';",
              lineB: "  let popupClassNames = 'pb-1 fixed min-w-32 max-w-64 bg-white rounded-lg shadow-xl overflow-auto ring-1 ring-black ring-opacity-5';",
            },
            {
              lineA: '      <motion.button key="PMP_cancelBtn" ref={cancelBtn} onClick={onCancelBtnClick} className="fixed inset-0 w-full h-full bg-black bg-opacity-25 cursor-default z-40 focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
              lineB: '      <motion.button key="PMP_cancelBtn" ref={cancelBtn} onClick={onCancelBtnClick} className="fixed inset-0 w-full h-full bg-black bg-opacity-25 cursor-default focus:outline-none" variants={popupBgFMV} initial="hidden" animate="visible" exit="hidden" />',
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
      /*{
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
      },*/
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
      { nameA: 'obj.js', nameB: 'obj.js', rule: SAME_FILE },
      { name: 'index-web.js', rule: IGNORE },
    ],
  },
  {
    name: 'vars.js',
    rule: {
      name: SAME_FILE,
      exclude: [
        {
          lineA: "  doExtractContents: false,",
          lineB: "  doDeleteOldNotesInTrash: false,",
        },
        {
          lineA: "  doDeleteOldLinksInTrash: false,",
          lineB: "  sortOn: false,",
        },
      ],
    },
  },
  { name: '*', rule: IGNORE },
]);

module.exports = root();
