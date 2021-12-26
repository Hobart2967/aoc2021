import * as fs from 'fs';
import * as path from 'path';

const partTwo: boolean = true;

(() => {
  const measurements = (fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n')[0])
    .split(',')
    .map(x => parseInt(x, 10));


  function median(values: number[]): number {
    if (values.length === 0) {
      throw new Error("No inputs");
    }

    values.sort((a, b) => a - b);

    var half = Math.floor(values.length / 2);

    if (values.length % 2) {
      return values[half];
    }

    return (values[half - 1] + values[half]) / 2.0;
  }

  function avg(values: number[]): number {
    const result = values
      .reduce((prev, cur) => prev += cur, 0) / values.length;
    console.log(result);
    return result;
  }

  const centricValue = partTwo
    ? Math.floor(avg(measurements))
    : Math.round(median(measurements));

  const totalFuel = measurements
    .map(x => Math.abs(x - centricValue))
    .reduce((prev, cur) => prev += (
      partTwo
        ? (Math.pow(cur, 2) + cur)/2
        : cur), 0);

  console.log('Fuel:', totalFuel);
})();