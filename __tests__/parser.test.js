import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'result.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'result.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'json.txt', 'json'],
  ['file1.yml', 'file2.yml', 'json.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "%s" style', (firstArg, secondArg, expected, format) => {
  const firstFile = getFixturePath(firstArg);
  const secondFile = getFixturePath(secondArg);
  const expectedResult = readFile(expected);
  const result = gendiff(firstFile, secondFile, format);
  expect(result).toEqual(expectedResult);
});
