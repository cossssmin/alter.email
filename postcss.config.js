const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === "production" ? purgecss({
      content: [
        './src/**/*.vue',
        './public/**/*.html',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatterns: [/CodeMirror/, /cm-/, /gutter/, /swal/],
    }) : "",
  ],
}
