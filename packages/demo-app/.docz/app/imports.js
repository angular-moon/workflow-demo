export const imports = {
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
  'src/components/Loading.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-loading" */ 'src/components/Loading.mdx'),
}
