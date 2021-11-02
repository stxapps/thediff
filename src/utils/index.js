const isObject = val => {
  return typeof val === 'object' && val !== null;
};

const isString = val => {
  return typeof val === 'string' || val instanceof String;
};

module.exports = { isObject, isString };
