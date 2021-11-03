const { SAME_FILE, SAME_FUNC, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/justnote-client/packages/web',
  nameB: '~/Drive/Workspace/justnote-client/packages/mobile',
  rule: [
    { name: 'jsconfig.json', rule: SAME_FILE },
    {
      name: 'tailwind.config.js',
      rule: {
        name: SAME_FILE,
        include: {
          startLine: "      colors: {",
          endLine: "        '64': '16rem',",
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
        name: 'data.js',
        rule: {
          name: SAME_FILE,
          exclude: [
            {
              lineA: "import userSession from '../userSession';",
              lineB: "import mmkvStorage from '../mmkvStorage';",
            },
            {
              lineA: "  await userSession.listFiles((fpath) => {",
              lineB: "  await mmkvStorage.listFiles((fpath) => {",
            },
            {
              lineA: "      userSession.getFile(fpath)",
              lineB: "      mmkvStorage.getFile(fpath)",
            },
            {
              lineA: "    if (fpath.endsWith(INDEX + DOT_JSON)) content = JSON.parse(content);",
              lineB: "",
            },
            {
              lineA: "    settings = JSON.parse(/** @type {string} */(await userSession.getFile(settingsFPath)));",
              lineB: "    settings = await mmkvStorage.getFile(settingsFPath);",
            },
            {
              lineA: "      userSession.putFile(fpath, contents[i], { dangerouslyIgnoreEtag: true })",
              lineB: "      mmkvStorage.putFile(fpath, contents[i])",
            },
            {
              lineA: "    contents.push(JSON.stringify({ title: note.title, body: note.body }));",
              lineB: "    contents.push({ title: note.title, body: note.body });",
            },
            {
              startLine: "export const batchDeleteFileWithRetry = async (fpaths, callCount) => {",
              endLine: "          return { error, fpath, success: false };",
            },
            {
              startLineA: "    contents.push(...responses.map(({ fpath, content }) => {",
              endLineA: "    }));",
              lineB: "    contents.push(...responses.map(({ content }) => content));",
            },
            {
              startLineA: "    const _contents = contents.slice(i, i + N_NOTES).map((content, k) => {",
              endLineA: "    });",
              lineB: "    const _contents = contents.slice(i, i + N_NOTES);",
            },
            {
              lineA: "const data = {",
              startLineB: "const deleteAllFiles = async () => {",
              endLineB: "const data = {",
            },
            {
              lineA: "  getFiles, putFiles, deleteFiles,",
              lineB: "  getFiles, putFiles, deleteFiles, deleteAllFiles,",
            },
          ],
        },
      },
      {
        name: 'file.js',
        rule: {
          name: SAME_FUNC,
          include: ['deriveFPath', 'deleteFile', 'deleteFiles'],
        },
      },
      {
        nameA: 'data.js',
        nameB: 'server.js',
        rule: {
          name: SAME_FUNC,
          exclude: [
            {
              lineA: "      userSession.putFile(fpath, contents[i], { dangerouslyIgnoreEtag: true })",
              lineB: "      userSession.putFile(fpath, contents[i])",
              name: 'batchPutFileWithRetry',
            },
            {
              startLineA: "            (error.message.includes('does_not_exist') ||",
              endLineA: "              error.message.includes('file_not_found'))) {",
              startLineB: "            (error.message.includes('failed to delete') &&",
              endLineB: "              error.message.includes('404'))) {",
              name: 'batchDeleteFileWithRetry',
            },
          ],
        },
      },
      { name: 'wallet.js', rule: IGNORE },
    ],
  },
  { name: 'reducers', rule: [{ name: '*', rule: SAME_FILE }] },
  { name: 'selectors', rule: [{ name: 'index.js', rule: SAME_FILE }] },
  {
    name: '@type',
    rule: [
      { name: ['custom.d.ts', 'react-redux.d.ts'], rule: SAME_FILE },
    ],
  },
  {
    name: 'types',
    rule: [
      { name: ['actionTypes.js', 'const.js', 'initialStates.js'], rule: SAME_FILE },
      { name: ['animConfigs.js'], rule: IGNORE },
    ],
  },
  {
    name: 'utils',
    rule: [
      { name: ['index.js', 'obj.js'], rule: SAME_FILE },
      { name: 'cache.js', rule: IGNORE },
    ],
  },
  { name: '*', rule: IGNORE },
]);

const actionsIndexJsRule = () => ({
  name: SAME_FUNC,
  exclude: [
    {
      name: [
        'init', 'handlePendingSignIn', 'handleScreenRotation',
        'sync', 'tryUpdateSynced', 'updateSynced',
      ],
    },
    {
      startLine: "  }",
      endLine: "  dispatch({",
      name: 'changeListName',
    },
    {
      lineA: "const onChangeListName = (title, body) => async (",
      lineB: "const onChangeListName = (title, body, keyboardHeight = 0) => async (",
      name: 'onChangeListName',
    },
    {
      lineA: "",
      lineB: "    if (keyboardHeight > 0) dispatch(increaseBlurCount());",
      name: 'onChangeListName',
    },
    {
      lineA: "    updatePopupUrlHash(CONFIRM_DISCARD_POPUP, true);",
      lineB: "    dispatch(updatePopup(CONFIRM_DISCARD_POPUP, true));",
      name: 'onChangeListName',
    },
    {
      lineA: "const onUpdateNoteId = (title, body) => async (",
      lineB: "const onUpdateNoteId = (title, body, keyboardHeight = 0) => async (",
      name: 'onUpdateNoteId',
    },
    {
      lineA: "",
      lineB: "    if (keyboardHeight > 0) dispatch(increaseBlurCount());",
      name: 'onUpdateNoteId',
    },
    {
      lineA: "    updatePopupUrlHash(CONFIRM_DISCARD_POPUP, true);",
      lineB: "    dispatch(updatePopup(CONFIRM_DISCARD_POPUP, true));",
      name: 'onUpdateNoteId',
    },
    {
      startLine: "    const fetched = await dataApi.fetch(params);",
      endLine: "    dispatch({ type: FETCH_COMMIT, payload: { ...params, ...fetched } });",
      name: 'fetch',
    },
    {
      startLine: "    const fetched = await dataApi.fetchMore(params);",
      endLine: "    dispatch({ type: FETCH_MORE_COMMIT, payload: { ...params, ...fetched } });",
      name: 'fetchMore',
    },
    {
      lineA: "  const { usedFPaths, localUnusedFPaths } = deriveFPaths(media, null, savingFPaths);",
      lineB: "  const { localUnusedFPaths } = deriveFPaths(media, null, savingFPaths);",
      name: 'addNote',
    },
    {
      startLine: "  dispatch({ type: ADD_NOTE, payload });",
      endLine: "    await dataApi.putNotes({ listName, notes: [note] });",
      name: 'addNote',
    },
    {
      startLine: "  const savingFPaths = getState().editor.savingFPaths;",
      endLine: "  const payload = { listName, fromNote: note, toNote };",
      name: 'updateNote',
    },
    {
      startLine: "  dispatch({ type: UPDATE_NOTE, payload });",
      endLine: "    await dataApi.putNotes({ listName, notes: [toNote] });",
      name: 'updateNote',
    },
    {
      lineA: "    dataApi.deleteFiles(serverUnusedFPaths);",
      lineB: "",
      name: 'updateNote',
    },
    {
      lineA: "  doCheckEditing, title = null, body = null",
      lineB: "  doCheckEditing, title = null, body = null, keyboardHeight = 0",
      name: 'discardNote',
    },
    {
      lineA: "",
      lineB: "      if (keyboardHeight > 0) dispatch(increaseBlurCount());",
      name: 'discardNote',
    },
    {
      lineA: "      updatePopupUrlHash(CONFIRM_DISCARD_POPUP, true);",
      lineB: "      dispatch(updatePopup(CONFIRM_DISCARD_POPUP, true));",
      name: 'discardNote',
    },
    {
      startLine: "  const { noteId, isBulkEditing, selectedNoteIds } = getState().display;",
      endLine: "  if (isBulkEditing) {",
      name: 'moveNotes',
    },
    {
      lineA: "    updateBulkEditUrlHash(false);",
      lineB: "    dispatch(updateBulkEdit(false));",
      name: 'moveNotes',
    },
    {
      lineA: "    dataApi.deleteFiles(unusedFPaths);",
      lineB: "",
      name: '_deleteNotes',
    },
    {
      startLine: "  const { noteId, isBulkEditing, selectedNoteIds } = getState().display;",
      endLine: "  if (isBulkEditing) {",
      name: 'deleteNotes',
    },
    {
      lineA: "    updateBulkEditUrlHash(false);",
      lineB: "    dispatch(updateBulkEdit(false));",
      name: 'deleteNotes',
    },
    {
      lineA: "      const { usedFPaths } = deriveFPaths(note.media, null, null);",
      lineB: "",
      name: 'retryDiedNotes',
    },
    {
      startLineA: "        const usedFiles = await fileApi.getFiles(usedFPaths);",
      endLineA: "        await dataApi.putFiles(usedFiles.fpaths, usedFiles.contents);",
      lineB: "",
      name: 'retryDiedNotes',
    },
    {
      lineA: "        usedFPaths, serverUnusedFPaths, localUnusedFPaths,",
      lineB: "        localUnusedFPaths,",
      name: 'retryDiedNotes',
    },
    {
      lineA: "        dataApi.deleteFiles(serverUnusedFPaths);",
      lineB: "",
      name: 'retryDiedNotes',
    },
    {
      startLineA: "      const safeAreaWidth = getState().window.width;",
      endLineA: "      else dispatch(updateNoteId(null));",
      lineB: "      dispatch(updateNoteId(null));",
      name: 'retryDiedNotes',
    },
    {
      lineA: "        dataApi.deleteFiles(unusedFPaths);",
      lineB: "",
      name: 'retryDiedNotes',
    },
    {
      lineA: "    dataApi.deleteFiles(unusedFPaths);",
      lineB: "",
      name: 'deleteOldNotesInTrash',
    },
    {
      startLine: "    noteMedia.push(...note.media);",
      endLine: "  const payload = { conflictedNote, toListName, toNote };",
      name: 'mergeNotes',
    },
    {
      startLine: "    const usedFiles = await fileApi.getFiles(usedFPaths);",
      endLine: "    await dataApi.putFiles(usedFiles.fpaths, usedFiles.contents);",
      name: 'mergeNotes',
    },
    {
      lineA: "    dataApi.deleteFiles(serverUnusedFPaths);",
      lineB: "",
      name: 'mergeNotes',
    },
    {
      startLineA: "    // Export only index.json and settings.json so safe to JSON.parse all responses.",
      endLineA: "    return { path: response.fpath, data: JSON.parse(response.content) };",
      startLineB: "    // Export only index.json and settings.json so safe to not JSON.parse all responses.",
      endLineB: "    return { path: response.fpath, data: response.content };",
      name: 'exportAllDataLoop',
    },
    {
      startLineA: "    var blob = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' });",
      endLineA: "    saveAs(blob, 'justnote-data.txt');",
      startLineB: "    //var blob = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' });",
      endLineB: "    //saveAs(blob, 'justnote-data.txt');",
      name: 'exportAllData',
    },
    {
      startLine: "  dispatch(updateDeleteAllDataProgress({ total: 'calculating...', done: 0 }));",
      endLine: "  const addedDT = Date.now();",
      name: 'deleteAllData',
    },
    {
      lineA: "    if (_staticFPaths) await dataApi.deleteFiles(_staticFPaths);",
      lineB: "",
      name: 'deleteAllData',
    },
    {
      lineA: "    updatePopupUrlHash(SETTINGS_POPUP, false, null);",
      lineB: "",
      name: 'deleteAllData',
    },
  ],
});

module.exports = root();
