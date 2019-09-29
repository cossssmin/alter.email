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
      whitelistPatterns: [/CodeMirror/, /cm-/, /gutter/, /swal/],
      extractors: [
        {
          extractor: class TailwindExtractor {
            static extract(content) {
              return content.match(/[A-z0-9-:\/]+/g) || [];
            }
          },
          extensions: ['vue', 'html']
        }
      ]
    }) : "",
  ],
}
