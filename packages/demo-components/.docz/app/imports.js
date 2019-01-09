export const imports = {
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
  'src/components/Alert/Alert.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-alert-alert" */ 'src/components/Alert/Alert.mdx'),
  'src/components/ApplyView/ApplyView.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-apply-view-apply-view" */ 'src/components/ApplyView/ApplyView.mdx'),
}
