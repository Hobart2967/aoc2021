import * as fs from 'fs';
import * as path from 'path';

const config = {
  part: 2
};

(() => {
  function getWindowSum(windowSize: number, measurements: number[], startIndex: number) {
    const window = measurements
      .slice(startIndex, startIndex + windowSize);

    return window.reduce((prev, cur) => prev + cur, 0);
  }

  const windowSize = config.part === 1
    ? 1
    : 3;

  const measurements = fs
    .readFileSync(path.join(__dirname, `inputs_${config.part}`))
    .toString()
    .split('\n')
    .map(x => parseInt(x, 10));

  if (measurements.some((line: number) => isNaN(line))) {
    throw new Error('Invalid inputs');
  }

  let increasingMeasurementsCounted = 0;
  for (let i = 1; i < measurements.length; i++) {
    const first = getWindowSum(windowSize, measurements, i - 1);
    const second = getWindowSum(windowSize, measurements, i);

    if (first < second) {
      increasingMeasurementsCounted++;
    }
  }

  console.log(`Counted ${increasingMeasurementsCounted} part two thingies`);
})();


