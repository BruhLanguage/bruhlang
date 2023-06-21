const fs = require('fs');
const path = require('path');
const Tokenizer = require('./stuff/modules');
const compile = require('./stuff/compile');
const { program } = require('commander');

program
  .option('-i, --input <file>', 'Input file with .bruh extension')
  .option('-c, --compile', 'Compile BruhLang code to JavaScript')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Error: Please specify an input file using -i or --input option');
  process.exit(1);
}

const inputFile = options.input;
const extension = path.extname(inputFile);

if (extension !== '.bruh') {
  console.error('Error: Invalid file extension. Only .bruh files are supported');
  process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error: Failed to read the input file: ${err.message}`);
    process.exit(1);
  }

  if (options.compile) {
    const compiledCode = compile(data);
    const compiledFile = `${path.basename(inputFile, '.bruh')}.js`;

    fs.writeFile(compiledFile, compiledCode, (err) => {
      if (err) {
        console.error(`Error: Failed to write the compiled file: ${err.message}`);
        process.exit(1);
      }

      console.log(`Successfully compiled to ${compiledFile}`);
    });
  } else {
    const tokenizer = new Tokenizer(data);
    const tokens = tokenizer.tokenize();
    console.log(tokens);
  }
});
