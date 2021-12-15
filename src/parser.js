import _ from 'lodash';
import fs from 'fs';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const parser = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFile(filepath1));
  const obj2 = JSON.parse(readFile(filepath2));
  // console.log(filepath1);
  // console.log(obj1);
  // const keys = _.sortedUniq(_.union(Object.keys(obj1), Object.keys(obj2)));
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
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return `${acc}  + ${key}: ${obj2[key]}\n`;
    }
  };
  const result = keys.reduce(func, '{\n');
  // let result = `{\n`;
  // for (const key of keys) {
  //  if (obj1[key] !== obj2[key] && _.has(obj1, key) && _.has(obj2, key)) {
  //    result = `${result}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`
  //  } else if (obj1[key] === obj2[key] && _.has(obj1, key) && _.has(obj2, key)) {
  //    result = `${result}    ${key}: ${obj1[key]}\n`
  //  } else if (_.has(obj1, key) && !_.has(obj2, key)) {
  //    result = `${result}  - ${key}: ${obj1[key]}\n`
  //  } else if (!_.has(obj1, key) && _.has(obj2, key)) {
  //    result = `${result}  + ${key}: ${obj2[key]}\n`
  //  }
  // }
  // result = `${result}}`;
  // console.log(keys)
  // console.log(_.sortedUniq(_.concat(Object.keys(obj1), Object.keys(obj2))));
  // console.log(_.sortBy(_.union(Object.keys(obj1), Object.keys(obj2))));
  const newResult = `${result}}`;
  console.log(newResult);
};

export default parser;
