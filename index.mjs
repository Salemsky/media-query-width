const em = (v, b) => {
  return [-1, 0, 1].indexOf(b || (b = 16)) === -1 ? v / b + 'em' : v * b + 'px';
};

const mix = (s, exp) => {
  const res = [s[0]];
  for (let i = 0; i < s.length; i++) res.push(exp[i], s[i + 1]);
  return res;
};

const flat = (s, p) => {
  let chunk,
    res = '';
  for (let i = 0; i < s.length; i++) {
    chunk = s[i];
    if (!chunk) {
      continue;
    } else if (Array.isArray(chunk)) {
      res += flat(chunk, p);
    } else if (typeof chunk === 'function') {
      res += p ? flat([chunk(p)], p) : chunk;
    } else if (typeof chunk === 'object') {
      let out = '';
      for (let k in chunk) {
        const v = chunk[k];
        k = k.replace(/[A-Z]/g, '-$&').toLowerCase();
        out += v && k + ':' + v + ';';
      }
      res += out;
    } else {
      res += chunk;
    }
  }
  return res;
};

function mqw() {
  let str = '';
  const arg = arguments[arguments.length - 1];
  for (const k in arg) {
    let v = arg[k];
    if (v && (v === arg.min || v === arg.max)) {
      v = typeof v !== 'number' ? (this[k] ? this[k][v] : this[v]) : v;
      str += str.length === 0 ? str : ' and ';
      str += '(' + k + '-width:' + em(v, arg.size || +arguments[0]) + ')';
    }
  }
  return str && '@media ' + str;
}

export const mediaQueryWidth = function () {
  const m = mqw.apply(this, arguments);
  return function (s) {
    if (!Array.isArray(s)) return m;
    const l = arguments.length,
      ar = new Array(l - 1);
    for (let i = 1; i < l; i++) ar[i - 1] = arguments[i];
    s = s.raw ? mix(s, ar) : s;
    return (p) => {
      const c = flat(s, p || {});
      return m ? (c ? m + '{' + c + '}' : m) : c;
    };
  };
};
