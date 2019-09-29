import juice from 'juice'
import { comb } from 'email-comb'
import cheerio from 'cheerio'
import qs from 'query-string'
import prettify from 'pretty'
import { crush } from 'html-crush'
import isUrl from 'is-url-superb'
import sixHex from 'color-shorthand-hex-to-six-digit'

exports.handler = async function (event, context, callback) {

  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed',
      }),
    })
  }

  let { html, config } = JSON.parse(event.body)

  if (!html) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Required information is missing.',
      }),
    })
  }

  // CSS Inliner
  if (config && config.inliner.enabled) {
    html = juice(html, config.inliner.options)
  }

  // Email Comb
  const removeUnusedCSS = config.cleaner.tools.removeUnusedCSS

  if (removeUnusedCSS && removeUnusedCSS.options && removeUnusedCSS.options.enabled) {
    html = comb(html, removeUnusedCSS.options).result
  }

  // Six digit HEX
  if (config.cleaner.tools.sixDigitHEX.enabled) {
    html = sixHex(html)
  }

  // Extra Attributes
  if (config.extraAttributes.elements.length > 0) {
    let $ = cheerio.load(html, { decodeEntities: false })

    config.extraAttributes.elements.forEach(el => {
      if (el.name.length > 0) {
        let $el = $(el.name)
        el.attributes.forEach(attr => {
          if (attr.name == 'class') {
            return $el.addClass(attr.value)
          }
          return $el.attr(attr.name, attr.value)
        })
      }
    })

    html = $.html()
  }

  // Base Image URL
  const baseImageURL = config.urls.items.baseImageURL.url
  if (baseImageURL && isUrl(baseImageURL)) {
    html = html.replace(/(background="|src=")(?!\s+|url\('?'?\)|"|https?:\/\/)\/?/ig, '$1' + baseImageURL)
                .replace(/(background(-image)?:\s?url\('?)(?!['\)]|https?:\/\/)\/?/ig, '$1' + baseImageURL)
  }

  // URL Parameters
  if (config.urls.items.urlParameters.pairs.length > 0) {
    let $ = cheerio.load(html, { decodeEntities: false })

    $('a').each((i, el) => {
      let url = $(el).attr('href')
      let parsed = qs.parseUrl(url)
      let pattern = new RegExp(/^(https?:\/\/)/gm)

      if (!isUrl(url) || !pattern.test(parsed.url))
        return

      let params = parsed.query

      config.urls.items.urlParameters.pairs.forEach(pair => {
        params[pair.key] = pair.encode ? encodeURIComponent(pair.value) : pair.value
      })

      params = qs.stringify(params, {encode: false})

      $(el).attr('href', `${parsed.url}?${params}`)
    })

    html = $.html()
  }

  // Prettify
  if (config.prettify.enabled) {
    html = prettify(html, config.prettify.options)
  }

  // Minify
  if (config.minify.enabled) {
    html = crush(html, config.minify.options).result
  }

  // Replace Strings
  let pairs = config.cleaner.tools.replaceStrings.enabled ? config.cleaner.tools.replaceStrings.pairs : false

  if (pairs && pairs.length > 0) {
    pairs.forEach(pair => {
      let r = new RegExp(pair.from, 'gi')
      html = html.replace(r, pair.to)
    })
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      html: html
    }),
  })
}
