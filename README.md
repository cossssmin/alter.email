# alter.email

A tool for transforming HTML emails.

> *Note: This repository has been archived and is no longer maintained. The tool is still available at https://alteremail.netlify.app, but it will no longer receive any updates.*

## Getting Started

### Clone this repository:

```
git clone https://github.com/cossssmin/alter.email.git
```

### Install dependencies:

```sh
# Navigate to project directory
cd alter.email

# Install dependencies with NPM
npm install
```

### Build Lambda function

```sh
npm run build:lambda
```

### Start developing

```sh
npm run serve
```

## Features

Alter.Email comes with most transformers that power the [Maizzle Email Framework](https://maizzle.com/).

#### CSS Inliner

Uses the [Juice](https://github.com/Automattic/juice) library to inline your embedded CSS.

#### Code Cleanup

- **Remove unused CSS**

    Uses [email-comb](https://www.npmjs.com/package/email-comb) to remove unused CSS.

- **Replace strings**

    Batch replace strings in your HTML email. Regex supported.

- **Six-digit HEX colors**

    Ensures that all your HEX colors are defined with [six digits](https://www.npmjs.com/package/color-shorthand-hex-to-six-digit).

#### Extra Attributes

Add any number of attributes to any elements in your HTML. Tag names can also be [cheerio](https://cheerio.js.org/) selectors.

#### URLs

- **Base Image URL**

    Prepend a base URL to all image sources in your email. Applies to both inline and background images.

- **URL Parameters**

    Add any number of query string parameters to your anchor URLs. You can choose which ones should be encoded, too!

#### Formatting

- **Prettify**

    Uses [pretty](https://www.npmjs.com/package/pretty) to pretty-print your HTML code.

- **Minify**

    Uses [html-crush](https://www.npmjs.com/package/html-crush) to minify your HTML code.

- **Plaintext**

    Uses [string-strip-html](https://www.npmjs.com/package/string-strip-html) to generate a plaintext version of your HTML email.

- **Prevent Widow Words**

    Uses [prevent-widows](https://www.npmjs.com/package/prevent-widows) to replace spaces and hyphens at the end of a string with non-breaking equivalents.

### UI Features

#### 📱 Responsive Preview

Preview your HTML live, in a resizable iframe:

- drag the handle to horizontally-resize the preview
- while dragging, the iframe shows a viewport pixel width indicator
- double-clicking the handle resets the panes to their original widths

#### ⚠ HTML Size Indicator

Shows your _approximate_ HTML input _and_ output file sizes, updated as-you-type.

When you're close to [Gmail's clipping limit](https://github.com/hteumeuleu/email-bugs/issues/41), it'll show a warning icon linked to a GitHub issue that discusses this in detail.

####

## Contributing

Have ideas for new features? Found a bug and want to squash it?

Pull requests are welcome!

However, nobody likes working hard just to see their PR rejected.
So, before starting any *significant* amount of work, please [open an issue](https://github.com/cossssmin/alter.email/issues/new) and describe your idea.

### Build previews

When you open a PR, Netlify CI will automatically deploy a public build preview of your branch.
