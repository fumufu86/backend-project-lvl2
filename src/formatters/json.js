const json = (data) => {
  const iter = (obj) => obj.map((item) => {
    switch (item.type) {
      case 'add':
        return { type: item.type, key: item.key, val: item.val };
      case 'del':
        return { type: item.type, key: item.key, val: item.val };
      case 'unchanged':
        return { type: item.type, key: item.key, val: item.val };
      case 'changed':
        return {
          type: item.type, key: item.key, val1: item.val1, val2: item.val2,
        };
      case 'node':
        return { type: item.type, key: item.key, child: iter(item.child) };
      default:
        return new Error(`Этого типа не существует: ${item.type}`);
    }
  });
  return JSON.stringify(iter(data));
};

export default json;
