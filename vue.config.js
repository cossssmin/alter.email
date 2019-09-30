module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://alter.email/' : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(([args]) => {
        args.xhtml = true
        args.minify.removeAttributeQuotes = false
        return [args]
      })
  }
}
