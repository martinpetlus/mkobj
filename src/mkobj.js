export default function mkobj(obj, ...props) {
  if (Array.isArray(obj)) {
    props.unshift(obj);

    // eslint-disable-next-line no-param-reassign
    obj = {};
  }

  props.forEach((prop) => {
    if (prop[0]) {
      // eslint-disable-next-line no-param-reassign
      obj[prop[1]] = prop[2];
    }
  });

  return obj;
}
