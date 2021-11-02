const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/stacks-access-in-webview/sign-up',
  nameB: '~/Drive/Workspace/stacks-access-in-webview/sign-in',
  rule: [
    { name: 'bin', rule: { name: '*', rule: SAME_FILE } },
    {
      name: 'public',
      rule: {
        name: 'index.html',
        rule: {
          name: SAME_FILE,
          exclude: {
            lineA: "    <title>Stacks Access - Sign up</title>",
            lineB: "    <title>Stacks Access - Sign in</title>",
          },
        },
      },
    },
    {
      name: [
        'craco.config.js', 'jsconfig.json', 'postcss.config.js', 'tailwind.config.js',
        'tailwind.css', '.dir-locals.el'
      ],
      rule: SAME_FILE,
    },
    { name: 'src', rule: srcRule() },
    { name: '*', rule: IGNORE },
  ],
});

const srcRule = () => ([
  { name: 'index.js', rule: SAME_FILE },
  { name: ['components', 'utils'], rule: IGNORE },
  { name: '*', rule: { name: '*', rule: SAME_FILE } },
]);

module.exports = root();
