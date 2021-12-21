import * as fs from 'fs';
import * as path from 'path';

(() => {
  const position = {
    x: 0,
    z: 0,
    aim: 0
  };

  const commands: { [command: string]: (value: number) => void } = {
    forward: (value: number) => {
      position.x += value;
      position.z += value * position.aim;
    },
    down: (value: number) => position.aim += value,
    up: (value: number) => position.aim -= value,
  };

  fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n')
    .map<string[]>(line => /^(forward|down|up) (\d+)$/.exec(line) as any)
    .map(([_, command, value]) => ({
      execute: commands[command],
      value: parseInt(value)
    }))
    .forEach(command => command.execute(command.value));

  console.log(`
    Position: ${JSON.stringify(position)}
    Multiplied: ${position.x*position.z}`);


})();