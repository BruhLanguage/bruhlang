class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Tokenizer {
  constructor(input) {
    this.input = input;
    this.position = 0;
  }

  tokenize() {
    const tokens = [];

    while (this.position < this.input.length) {
      const char = this.input[this.position];

      if (char === ' ' || char === '\n' || char.includes('\n')) {
        // Ignore whitespace and new lines
        this.position++;
      } else if (char === 'b' && this.input.slice(this.position, this.position + 3) === 'bro') {
        // Match 'bro' keyword
        tokens.push(new Token('KEYWORD', 'bro'));
        this.position += 3;
      } else if (char.match(/[a-zA-Z]/)) {
        // Match identifiers
        const start = this.position;
        let end = this.position + 1;

        while (end < this.input.length && this.input[end].match(/[a-zA-Z0-9]/)) {
          end++;
        }

        const value = this.input.slice(start, end);
        tokens.push(new Token('IDENTIFIER', value));

        this.position = end;
      } else if (char.match(/[0-9]/)) {
        // Match numeric values
        const start = this.position;
        let end = this.position + 1;

        while (end < this.input.length && this.input[end].match(/[0-9]/)) {
          end++;
        }

        const value = this.input.slice(start, end);
        tokens.push(new Token('NUMBER', value));

        this.position = end;
      } else if (char === '(' && this.input.slice(this.position, this.position + 11) === 'typedatshit') {
        // Match 'typedatshit' function
        tokens.push(new Token('FUNCTION', 'typedatshit'));
        this.position += 11;
      } else if (char === '=') {
        // Match assignment operator
        tokens.push(new Token('ASSIGN', char));
        this.position++;
      } else if (char === ')') {
        // Match closing parenthesis
        tokens.push(new Token('PAREN', char));
        this.position++;
      } else if (char === '"') {
        // Match string literals
        const start = this.position;
        let end = this.position + 1;

        while (end < this.input.length && this.input[end] !== '"') {
          end++;
        }

        if (end === this.input.length) {
          throw new Error(`Unterminated string literal starting at position ${start}`);
        }

        const value = this.input.slice(start + 1, end);
        tokens.push(new Token('STRING', value));

        this.position = end + 1;
      } else {
        // Unrecognized character
        throw new Error(`Unexpected character: ${char}`);
      }
    }

    return tokens;
  }
}

module.exports = Tokenizer;
