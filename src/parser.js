import _ from 'lodash';
import fs from 'fs';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const parser = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFile(filepath1));
  const obj2 = JSON.parse(readFile(filepath2));
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const func = (acc, key) => {
    if (obj1[key] !== obj2[key] && _.has(obj1, key) && _.has(obj2, key)) {
      return `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    } if (
      obj1[key] === obj2[key]
      && _.has(obj1, key)
      && _.has(obj2, key)
    ) {
      return `${acc}    ${key}: ${obj1[key]}\n`;
    } if (_.has(obj1, key) && !_.has(obj2, key)) {
      return `${acc}  - ${key}: ${obj1[key]}\n`;
    }
    // if (!_.has(obj1, key) && _.has(obj2, key)) {
    return `${acc}  + ${key}: ${obj2[key]}\n`;
    // }
  };
  const result = keys.reduce(func, '{\n');
  const newResult = `${result}}`;
  console.log(newResult);
  return newResult;
};

export default parser;
