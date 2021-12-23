import * as fs from 'fs';
import * as path from 'path';

(() => {
  let counter: { [index: string]: number[] } = {};
  const lines = fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n');

  const measurements = getMeasurements(lines);

  function addDigit(index: number, digit: string) {
    counter[index] = counter[index] || [];
    counter[index].push(parseInt(digit, 2));
  }

  function count(digit: number, list: number[]) {
    return list.filter(x => x === digit).length;
  }

  function getCommonBits(
    inputs: string[][],
    predicate: (value: number) => boolean): string {

    counter = {};

    inputs.forEach(digits =>
      digits.forEach((digit, index) =>
        addDigit(index + 1, digit)));

    const digitCount = Math
      .max(...Object
        .keys(counter)
        .map(x => parseInt(x)));

    return Array.from(new Array(digitCount))
      .map((_, digitIndex) =>
        count(1, counter[(digitIndex + 1).toString()]))
      .map(digitCount => (digitCount / inputs.length) * 100)
      .map(digitCount => {
        console.log(digitCount);
        return digitCount;
      })
      .map((ratio) => predicate(ratio))
      .map(isMostCommon => (isMostCommon ? 1 : 0))
      .join('');
  }

  function filterList(lines: string[], predicate: (val: number) => boolean): string[] {
    if (lines.length === 1) {
      return lines;
    }

    let index = 0;
    while (lines.length > 1) {
      const binaryDigits = getCommonBits(
        getMeasurements(lines),
        predicate
      ).split('');

      const filterResult = lines.filter(x => x[index] === binaryDigits[index]);
      if (!filterResult.length) {
        break;
      }

      lines = filterResult;
      index++;

      if (lines.length === 1) {
        break;
      }
    }

    return lines;
  }

  const mostCommonBinary = getCommonBits(measurements, val => {
    if (val === 50) {
      console.log('#### EQUAL')
    }
    return val >= 50
  });

  const leastCommonBinary = getCommonBits(measurements, val => {
    if (val === 50) {
      console.log('#### EQUAL')
    }
    return val < 50;
  });

  const mostCommonDecimal = parseInt(mostCommonBinary, 2);
  const leastCommonDecimal = parseInt(leastCommonBinary, 2);

  console.log('### oxygen');
  const oxygenGeneratorRating = filterList(lines, val => val >= 50)[0];
  const oxygenGeneratorRatingDec = parseInt(oxygenGeneratorRating, 2);
  console.log('### co2');
  const co2ScrubberRating = filterList(lines, val => val < 50)[0];
  const co2ScrubberRatingDec = parseInt(co2ScrubberRating, 2);

  console.log(`
    mostCommon (bin): ${mostCommonBinary}
    leastCommon (bin): ${leastCommonBinary}
    mostCommon (dec): ${mostCommonDecimal}
    leastCommon (dec): ${leastCommonDecimal}

    oxygenGeneratorRating (bin): ${JSON.stringify(oxygenGeneratorRating)}
    oxygenGeneratorRating (dec): ${JSON.stringify(oxygenGeneratorRatingDec)}
    co2ScrubberRating (bin): ${JSON.stringify(co2ScrubberRating)}
    co2ScrubberRating (dec): ${JSON.stringify(co2ScrubberRatingDec)}

    Part 1 Result: ${mostCommonDecimal*leastCommonDecimal}
    Part 2 Result: ${oxygenGeneratorRatingDec*co2ScrubberRatingDec}`);
})();

function getMeasurements(lines: string[]) {
  return lines
    .map(line => Array
      .from(line.matchAll(/\d/g))
      .map(([match]) => match));
}

