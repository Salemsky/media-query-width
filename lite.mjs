const em = (v, b) => {
  return [-1, 0, 1].indexOf(b || (b = 16)) === -1 ? v / b + 'em' : v * b + 'px';
};

export const mediaQueryWidth = function () {
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
};
