const BASE_64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const detectPadding = (string) => {
  if (/==$/.test(string)) {
    return 4;
  }
  if (/=$/.test(string)) {
    return 2;
  }
  return 0;
};

const toBase64 = (string) => {
  return string
    .split('')
    .map((s) => s.charCodeAt(0))
    .map((n) => n.toString(2))
    .map((n) => n.padStart(8, '0'))
    .join('')
    .match(/.{1,6}/g)
    .map((s, i, a) => {
      return (i !== a.length - 1) ?
        BASE_64[parseInt(s, 2)] :
        BASE_64[parseInt(s.padEnd(6, '0'), 2)] +
          {0: '', 2: '==', 4: '='}[s.length];
    })
    .join('');
}

const fromBase64 = (string) => {
  const padding = detectPadding(string);
  return string.split('')
    .filter((s) => s !== '=')
    .map((c) => BASE_64.indexOf(c))
    .map((n) => n.toString(2))
    .map((n) => n.padStart(6, '0'))
    .join('')
    .slice(0, -1 * padding || undefined)
    .match(/.{1,8}/g)
    .map((s) => String.fromCharCode(parseInt(s, 2)))
    .join('');
}

module.exports = {
  to: toBase64,
  from: fromBase64
};
