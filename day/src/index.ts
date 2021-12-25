import * as fs from 'fs';
import * as path from 'path';

(() => {
  const measurements = fs
    .readFileSync(path.join(__dirname, 'inputs_sample'))
    .toString()
    .split('\n')
    .map(x => parseInt(x, 10));

  if (measurements.some((line: number) => isNaN(line))) {
    throw new Error('Invalid inputs');
  }

  let increasingMeasurementsCounted = 0;
  for (let i = 1; i < measurements.length; i++) {
    const first = measurements[i - 1];
    const second = measurements[i];
    if (first < second) {
      increasingMeasurementsCounted++;
    }
  }

  console.log(`Counted ${increasingMeasurementsCounted} thingies`);


})();