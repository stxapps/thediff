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
          funcNames: [
            'batchGetFileWithRetry', 'batchPutFileWithRetry', 'batchDeleteFileWithRetry',
          ],
          exclude: {
            lineA: "export const batchGetFileWithRetry = async (",
            lineB: "const batchGetFileWithRetry = async (",
            name: 'batchGetFileWithRetry',
          },
        },
      },
      { name: 'wallet.js', rule: SAME_FILE },
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
      { name: ['patterns.css', 'tailwinds.css', 'ckeditor.css'], rule: IGNORE },
    ],
  },
  {
    name: '@type',
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
              endLineB: "  //   as this random string might append to timestamp.",
              name: 'randomString',
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
