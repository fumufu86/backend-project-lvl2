import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test parser.js for JSON', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  const expectedResult = readFile('result.txt');
  const result = gendiff(firstFile, secondFile);
  expect(result).toEqual(expectedResult);
});

test('test parser.js for YAML', () => {
  const firstFile = getFixturePath('file1.yml');
  const secondFile = getFixturePath('file2.yml');
  const expectedResult = readFile('result.txt');
  const result = gendiff(firstFile, secondFile);
  expect(result).toEqual(expectedResult);
});