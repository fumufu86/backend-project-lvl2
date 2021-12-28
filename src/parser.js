import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import findDiffs from './finddiffs.js';
import format from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const parser = (filepath1, filepath2, formatName = 'stylish') => {
  const extname1 = path.extname(filepath1).slice(1);
  const extname2 = path.extname(filepath2).slice(1);
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = parse(extname1, data1);
  const obj2 = parse(extname2, data2);
  const diffs = findDiffs(obj1, obj2);
  const result = format(diffs, formatName);
  return result;
};

export default parser;
