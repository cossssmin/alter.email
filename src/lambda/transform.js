import juice from 'juice'
import cheerio from 'cheerio'
import qs from 'query-string'
import prettify from 'pretty'
import { comb } from 'email-comb'
import isUrl from 'is-url-superb'
import { crush } from 'html-crush'
import sixHex from 'color-shorthand-hex-to-six-digit'

const alterEncodeURIComponent = (str) => {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16))
    .replace(/%20/g, '+')
}

exports.handler = async function (event, context, callback) {
  try {
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

    let transforms = 0

    // CSS Inliner
    if (config && config.inliner.enabled) {
      transforms++
      html = juice(html, config.inliner.options)
    }

    // Email Comb
    const removeUnusedCSS = config.cleaner.tools.removeUnusedCSS

    if (removeUnusedCSS && removeUnusedCSS.options && removeUnusedCSS.options.enabled) {
      html = comb(html, removeUnusedCSS.options).result
      transforms++
    }

    // Six digit HEX
    if (config.cleaner.tools.sixDigitHEX.enabled) {
      html = sixHex(html)
      transforms++
    }

    // Extra Attributes
    if (config.extraAttributes.elements.length > 0) {
      let $ = cheerio.load(html, { decodeEntities: false })
      let attributeApplied = false

      config.extraAttributes.elements.forEach(el => {
        if (el.name.length > 0) {
          let $el = $(el.name)
          el.attributes.forEach(attr => {
            if (attr.value.length > 0) {
              attributeApplied = true
            }
            if (attr.name == 'class') {
              return $el.addClass(attr.value)
            }
            return $el.attr(attr.name, attr.value)
          })
        }
      })

      html = $.html()

      if (attributeApplied) {
        transforms++
      }
    }

    // Base Image URL
    const baseImageURL = config.urls.items.baseImageURL.url
    if (baseImageURL && isUrl(baseImageURL)) {
      html = html.replace(/(background="|src=")(?!\s+|url\('?'?\)|"|https?:\/\/)\/?/ig, '$1' + baseImageURL).replace(/(background(-image)?:\s?url\('?)(?!['\)]|https?:\/\/)\/?/ig, '$1' + baseImageURL)
      transforms++
    }

    // URL Parameters
    if (config.urls.items.urlParameters.pairs.length > 0) {
      let $ = cheerio.load(html, { decodeEntities: false })
      let paramsApplied = 0

      $('a').each((i, el) => {
        let url = $(el).attr('href')
        let parsed = qs.parseUrl(url)
        let pattern = new RegExp(/^(https?:\/\/)/gm)

        if (!isUrl(url) || !pattern.test(parsed.url))
          return

        let params = parsed.query

        config.urls.items.urlParameters.pairs.forEach(pair => {
          params[pair.key] = pair.encode ? alterEncodeURIComponent(pair.value) : pair.value
          pair.value.length > 0 ? paramsApplied++ : paramsApplied--
        })

        params = qs.stringify(params, {encode: false})

        $(el).attr('href', `${parsed.url}?${params}`)
      })

      html = $.html()

      if (paramsApplied.length > 0) {
        transforms++
      }
    }

    // Prettify
    if (config.formatting.items.prettify.enabled) {
      html = prettify(html, config.formatting.items.prettify.options)
      transforms++
    }

    // Minify
    if (config.formatting.items.minify.enabled) {
      html = crush(html, config.formatting.items.minify.options).result
      transforms++
    }

    // Replace Strings
    let pairs = config.cleaner.tools.replaceStrings.enabled ? config.cleaner.tools.replaceStrings.pairs : false

    if (pairs && pairs.length > 0) {
      pairs.forEach(pair => {
        let r = new RegExp(pair.from, 'gi')
        html = html.replace(r, pair.to)
      })
      transforms++
    }

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        html: html,
        transforms: transforms
      }),
    })
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      }),
    })
  }
}
