module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://alter.email/' : '/',
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
