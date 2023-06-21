#!/usr/bin/env node
const { program } = require('commander');
const compile = require('../stuff/compile');

program
  .version('1.0.0')
  .description('BruhLang Compiler');

program
  .option('-i, --input <file>', 'Input file')
  .option('-c, --compile', 'Compile BruhLang code to JavaScript')
  .parse(process.argv);

if (program.compile && program.input) {
  compile(program.input);
} else {
  program.outputHelp();
}
