const { SAME_FILE, IGNORE, SAME_FUNC } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/web',
  nameB: '~/Drive/Workspace/stacks-access-in-webview/sign-up',
  rule: [
    { name: 'bin', rule: { name: 'patch.js', rule: SAME_FUNC } },
    { name: ['jsconfig.json', 'postcss.config.js', '.dir-locals.el'], rule: SAME_FILE },
    {
      name: 'tailwind.config.js',
      rule: {
        name: SAME_FILE,
        exclude: [
          {
            startLine: "        green: colors.green,",
            endLine: "  variants: {",
          },
        ],
      },
    },
    { name: 'src', rule: srcRule() },
    { name: '*', rule: IGNORE },
  ],
});

const srcRule = () => ([
  {
    name: 'apis',
    rule: [
      { name: 'wallet.js', rule: SAME_FILE },
      { name: ['blockstack.js', 'customOffline.js'], rule: IGNORE },
    ],
  },
  {
    name: 'components',
    rule: [
      { name: 'SignUp.js', rule: componentSignUpRule() },
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
          include: {
            startLine: ".ball-clip-rotate {",
            endLine: "    transform: rotate(360deg) scale(.8);",
          },
        }
      },
      { name: ['patterns.css', 'tailwind.css'], rule: IGNORE },
    ],
  },
  {
    name: '@types',
    rule: [
      {
        name: 'custom.d.ts',
        rule: {
          name: SAME_FILE,
          exclude: {
            lineA: "",
            startLineB: "  ReactNativeWebView?: any;",
            endLineB: "  StacksAccessSignUp?: any;",
          },
        },
      },
      { name: 'react-redux.d.ts', rule: IGNORE },
    ],
  },
  {
    name: 'utils',
    rule: { name: '*', rule: SAME_FUNC },
  },
  { name: '*', rule: IGNORE },
]);

const componentSignUpRule = () => ({
  name: SAME_FILE,
  exclude: [
    {
      lineA: "import { isString, randomString, copyTextToClipboard } from '../utils';",
      lineB: "import { isString, copyTextToClipboard } from '../utils';",
    },
    {
      lineA: "  const [viewId, setViewId] = useState(VIEW_START);",
      lineB: "  const [viewId, setViewId] = useState(props.viewId);",
    },
    {
      startLineA: "  const walletData = useRef(null);",
      endLineA: "  const prevViewId = useRef(viewId);",
      lineB: "  const walletData = useRef(props.walletData);",
    },
    {
      startLine: "        walletData.current = data;",
      endLine: "        setViewId(VIEW_YOUR);",
    },
    {
      lineA: "",
      lineB: "    props.onUpdateViewIdBtnClick(VIEW_SAVE);",
    },
    {
      lineA: "",
      lineB: "    props.onUpdateViewIdBtnClick(VIEW_YOUR);",
    },
    {
      startLineA: "    if (viewId === VIEW_YOUR && prevViewId.current === VIEW_START) {",
      endLineA: "    if (window.document.activeElement instanceof HTMLButtonElement) {",
      lineB: "    if (window.document.activeElement instanceof HTMLButtonElement) {",
    },
    {
      lineA: "    if (scrollView.current) scrollView.current.scrollTo(0, 0);",
      lineB: "    window.scrollTo(0, 0);",
    },
    {
      lineA: '        <div ref={scrollView} className="relative flex-1 overflow-x-hidden overflow-y-auto px-4 sm:px-6">',
      lineB: '        <div className="relative overflow-x-hidden px-4 sm:px-6">',
    },
    {
      startLineA: '          <p className="mt-5 text-center text-sm text-gray-500">',
      endLineA: '          </p>',
      lineB: "",
    },
    {
      lineA: '        <ul className="mt-32 mb-8 border-t border-b border-gray-200 divide-y divide-gray-200">',
      lineB: '        <ul className="mt-24 mb-8 border-t border-b border-gray-200 divide-y divide-gray-200">',
    },
  ],
});

module.exports = root();
