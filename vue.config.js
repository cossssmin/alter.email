module.exports = {
  publicPath: () => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.CONTEXT === 'deploy-preview') {
        return `${process.env.DEPLOY_PRIME_URL}/`
      }
      return 'https://alter.email/'
    }
    return '/'
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('html')
        .tap(([args]) => {
          args.xhtml = true
          args.minify.removeAttributeQuotes = false
          return [args]
        })
    }
  }
}
