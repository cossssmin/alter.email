let fullURL = process.env.NODE_ENV === 'production' ? 'https://alter.email/' : '/'

module.exports = {
  publicPath: process.env.CONTEXT === 'deploy-preview' ? `${process.env.DEPLOY_PRIME_URL}/` : fullURL,
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
