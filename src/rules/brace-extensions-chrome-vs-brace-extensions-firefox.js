const { SAME_FILE, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-extensions/chrome',
  nameB: '~/Drive/Workspace/brace-extensions/firefox',
  rule: [
    { name: 'css', rule: { name: '*', rule: SAME_FILE } },
    {
      name: 'js',
      rule: [
        {
          name: 'background.js',
          rule: {
            name: SAME_FILE,
            exclude: [
              {
                lineA: "      setSelfAsOpener: true,",
                lineB: "      allowScriptsToClose: true,",
              },
              {
                lineA: "    await browser.windows.create(createInfo);",
                startLineB: "    const { id } = await browser.windows.create(createInfo);",
                endLineB: "    }",
              }
            ]
          }
        },
        {
          name: ['options.js', 'popup.js'],
          rule: SAME_FILE,
        },
        {
          name: ['browser-polyfill.min.js', 'browser-polyfill.min.js.map'],
          rule: IGNORE,
        },
      ],
    },
    {
      name: 'manifest.json',
      rule: {
        name: SAME_FILE,
        include: {
          startLine: '  "icons": {',
          endLine: '  "background": {',
        },
      },
    },
    {
      name: 'options.html',
      rule: {
        name: SAME_FILE,
        exclude: [
          {
            lineA: '  <div class="px-5 pt-1 pb-4">',
            lineB: '  <div class="py-4">',
          },
          {
            lineA: '  <script src="js/browser-polyfill.min.js"></script>',
            lineB: '',
          }
        ],
      },
    },
    {
      name: 'popup.html',
      rule: {
        name: SAME_FILE,
        exclude: [
          {
            lineA: '  <script src="js/browser-polyfill.min.js"></script>',
            lineB: '',
          }
        ],
      },
    },
    { name: '*', rule: IGNORE },
  ],
});

module.exports = root();
