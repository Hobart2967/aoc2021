import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

enum Connection {
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  g = 'g'
}

type Digit = Array<Connection>;

interface Command {
  inputs: Digit[];
  outputs: Digit[];
}

(() => {
  function parseLine(line: string): Command {
    const parts = line.split(' | ');
    const inputs = parts[0].split(' ');
    const outputs = parts[1].split(' ');

    return {
      inputs: inputs.map(x => x.split('')) as Digit[],
      outputs: outputs.map(x => x.split('')) as Digit[]
    }
  }

  const commands = fs
    .readFileSync(path.join(__dirname, 'inputs_sample'))
    .toString()
    .split('\n')
    .map(x => parseLine(x));


  for (const command of commands) {
    for (const inputs of command.inputs) {
      printDigit(inputs);
    }
  }

})();

function printDigit(inputs: Digit) {
  const digitChars: any = {
    a: ' _ \n',
    b: '|',
    c: '|\n',
    d: '_',
    e: '|',
    f: '|\n',
    g: '_'
  };

  const digitOutput = ['a', 'b', 'd', 'c', 'e', 'g', 'f']
    .map(x => {

      if (inputs.includes(x as Connection)) {
        return chalk.red(digitChars[x]);
      }

      let newLine = '\n';
      if (!digitChars[x].endsWith('\n')) {
        newLine = '';
      }

      // return Array.from(new Array(digitChars[x].length)).map(() => ).join('') + newLine;
      return chalk.grey(digitChars[x]);
    });

  console.log(inputs.join(''))
  console.log(chalk.bgBlack(digitOutput.join('')));
}
