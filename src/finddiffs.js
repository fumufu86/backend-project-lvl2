import _ from 'lodash';

const buildtree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  const diffs = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'del', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'node', key, child: buildtree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed', key, val1: value1, val2: value2,
      };
    }
    return { type: 'unchanged', key, val: value1 };
  });
  return diffs;
};

export default buildtree;
