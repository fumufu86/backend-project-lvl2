#!/usr/bin/env node
import program from 'commander';
import parser from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => console.log(parser(filepath1, filepath2, format)));
program.parse();
