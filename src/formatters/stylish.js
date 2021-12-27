const indent = (depth, spaceCount = 4, replacer = ' ') => replacer.repeat(spaceCount * depth - 2);

const stringify = (data, spacesCount = 1) => {
  const iter = (current, depth) => {
    if (typeof current !== 'object') return `${current}`;
    if (data === null) { return null; }
    const keys = Object.keys(current);
    const lines = keys.map((key) => {
      const value = iter(current[key], depth + 1);
      return `${indent(depth + 1)}  ${key}: ${value}`;
    });
    return ['{', ...lines, `${indent(depth)}  }`].join('\n');
  };

  return iter(data, spacesCount);
};

const stylish = (data) => {
  const iter = (current, depth) => current.map((item) => {
    const getValue = (value, mark) => `${indent(depth)}${mark} ${item.key}: ${stringify(value, depth)}\n`;
    switch (item.type) {
      case 'add':
        return getValue(item.val, '+');
      case 'del':
        return getValue(item.val, '-');
      case 'unchanged':
        return getValue(item.val, ' ');
      case 'changed':
        return `${getValue(item.val1, '-')}${getValue(item.val2, '+')}`;
      case 'node':
        return `${indent(depth)}  ${item.key}: {\n${iter(item.child, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Этого типа не существует: ${item.type}`);
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
};
export default stylish;
