const { SAME_FILE, SAME_FUNC, IGNORE } = require('../types/const');

const root = () => ({
  nameA: '~/Drive/Workspace/brace-client/packages/web/src',
  nameB: '~/Drive/Workspace/stacks-access-in-webview/sign-in/src',
  rule: [
    {
      name: 'components',
      rule: [
        { name: 'SignIn.js', rule: compomentSignInRule() },
        { name: '*', rule: IGNORE },
      ],
    },
    {
      name: 'utils',
      rule: [
        { name: 'index.js', rule: SAME_FUNC },
        { name: '*', rule: IGNORE },
      ],
    },
  ],
});

const compomentSignInRule = () => ({
  name: SAME_FILE,
  exclude: [
    {
      lineA: "  const [viewId, setViewId] = useState(VIEW_YOUR);",
      lineB: "  const [viewId, setViewId] = useState(props.viewId);",
    },
    {
      startLineA: "  const walletData = useRef(null);",
      endLineA: "  const scrollView = useRef(null);",
      lineB: "  const walletData = useRef(props.walletData);",
    },
    {
      lineA: "",
      lineB: "        props.onContinueBtnClick(VIEW_CHOOSE, data);",
    },
    {
      startLineA: "    if (viewId === VIEW_YOUR) {",
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
  ],
});

module.exports = root();
