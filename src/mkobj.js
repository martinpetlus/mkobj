module.exports = function mkobj(obj, ...props) {
  if (arguments.length === 0) return {};

  if (Array.isArray(obj)) {
    props.unshift(obj);

    // eslint-disable-next-line no-param-reassign
    obj = {};
  }

  props.forEach((prop) => {
    const propValue = prop.length === 2 ? prop[0] : prop[2];

    if (prop[0]) {
      // eslint-disable-next-line no-param-reassign
      obj[prop[1]] = propValue;
    }
  });

  return obj;
};
