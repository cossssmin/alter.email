const crlf = /(\r?\n|\r)/g;
const whitespace = /(\r?\n|\r|\s+)/g;

export default {
  count: function(text, options) {
    options = options || {};
    options.lineBreaks = options.lineBreaks || 1;
    options.ignoreWhitespace = options.ignoreWhitespace || false;

    let length = text.length,
        nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
        lineBreaks = length - text.replace(crlf, '').length;

    if (options.ignoreWhitespace) {
      text = text.replace(whitespace, '');
      return text.length + nonAscii;
    }
    else {
      return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
    }
  },
  format: function(count, plainText) {
    let level = 0;

    while (count > 1024) {
      count /= 1024;
      level++;
    }

    count = Math.round(count*100)/100;
    level = ['', 'K', 'M', 'G', 'T'][level];

    return plainText ? count : count + ' ' + level + 'B';
  }
};
