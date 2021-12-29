const stringify = (data) => {
  if (typeof data === 'boolean') return `${data}`;
  if (typeof data === 'string') return `'${data}'`;
  if (typeof data !== 'object') return `${data}`;
  if (data === null) { return null; }
  return '[complex value]';
};

const plain = (data) => {
  const iter = (obj, parent = '') => obj.flatMap((item) => {
    const property = parent ? `${parent}.${item.key}` : item.key;
    switch (item.type) {
      case 'add':
        return `Property '${property}' was added with value: ${stringify(item.val)}`;
      case 'del':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringify(item.val1)} to ${stringify(item.val2)}`;
      case 'node':
        return iter(item.child, `${property}`);
      default:
        return '';
    }
  });
  const result = iter(data);
  return result.flat().filter((item) => item !== '').join('\n');
};

export default plain;
