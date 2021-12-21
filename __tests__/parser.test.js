import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test parser.js', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  const expectedResult = readFile('result.json');
  const result = gendiff(firstFile, secondFile);
  expect(result).toEqual(expectedResult);
});
