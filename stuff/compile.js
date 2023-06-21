const fs = require('fs');
const path = require('path');
const Tokenizer = require('./modules');

function compile(sourceCode) {
  const tokenizer = new Tokenizer(sourceCode);
  const tokens = tokenizer.tokenize();

  let compiledCode = '';

  for (const token of tokens) {
    if (token.type === 'FUNCTION' && token.value === 'typedatshit') {
      compiledCode += 'console.log'; // Mapping 'typedatshit' to 'console.log'
    } else if (token.type === 'STRING') {
      compiledCode += `"${token.value}"`;
    } else {
      compiledCode += token.value;
    }

    compiledCode += ' ';
  }

  return compiledCode;
}

module.exports = compile;
