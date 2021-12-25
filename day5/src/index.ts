import * as fs from 'fs';
import * as path from 'path';
interface Point {
  x: number, y: number
}
interface Line {
  source: Point;
  target: Point;
}

(() => {

  const areas = fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n')
    .map(x => /(\d+),(\d+) -> (\d+),(\d+)/g.exec(x))
    .map(x => Array.from(x as RegExpExecArray))
    .map(x => x.slice(1))
    .map(x => x.map(y => parseInt(y, 10)))
    .map<Line>(([x1, y1, x2, y2]) => ({
      source: {
        x: x1,
        y: y1
      },
      target: {
        x: x2,
        y: y2
      }
    }));

  function isHorizontal(source: Point, target: Point): boolean {
    return Math.abs(source.x - target.x) === Math.abs(source.y - target.y);
  }

  const field: number[][] = buildField();

  for (const area of areas) {
    // tslint:disable-next-line: typedef
    const { source, target } = area;

    let type: 'h'|'d'|'v';
    const direction: Point = {
      x: 0,
      y: 0
    };

    if (source.y === target.y) {
      direction.x = source.x < target.x
        ? 1
        : -1;
      type = 'h';
    } else if (source.x === target.x) {
      direction.y = source.y < target.y
        ? 1
        : -1;
      type = 'v';
    } else if(isHorizontal(source, target)) {
      direction.x = source.x < target.x
        ? 1
        : -1;
      direction.y = source.y < target.y
        ? 1
        : -1;
      type = 'd';
    } else {
      continue;
    }

    console.log(`Rendering [${type}] ${source.x},${source.y} -> ${target.x},${target.y}`)
    const current = { ...source };
    do {
      markAsVentOutput(current);

      current.x = current.x + direction.x;
      current.y = current.y + direction.y;
    } while (current.y !== target.y || current.x !== target.x);

    markAsVentOutput(current);
  }

  let overlapCount = 0;
  for (const row of field) {
    overlapCount += row
      .filter(x => x >= 2)
      .length;
  }

  console.log('');
  printField(field);
  console.log('');
  console.log(`Found ${overlapCount} dangerous areas.`);
  console.log('');


  function markAsVentOutput(current: { x: number; y: number; }): void {
    field[current.y][current.x]++;
    console.log(`-> Covered ${current.x},${current.y}`);
  }

  function buildField(): number[][] {
    const newField: number[][] = [];

    const horizontalSize = getMaximumCoords(point => point.x);
    const verticalSize = getMaximumCoords(point => point.y);

    for (let row = 0; row <= verticalSize; row++) {
      newField.push(
        Array.from(new Array(horizontalSize + 1))
          .map(() => 0));
    }
    return newField;
  }

  function printField(fieldToPrint: number[][]): void {
    const horizontalSize = getMaximumCoords(point => point.x);
    const horizontalAxisTemplate = Array.from(new Array(horizontalSize + 1));

    console.log(
      `  | ${horizontalAxisTemplate.map((_, i) => i).join(' ')}\n`+
      `----${horizontalAxisTemplate.map(() => '--').join('')}\n`+
       fieldToPrint
        .map((row, index) =>
          `${index} | ${row
            .map(column => column || '.')
            .join(' ')}`)
        .join('\n'));
  }



  function getMaximumCoords(coordSelector: (coord: { x: number, y: number }) => number): number {
    return Math.max(...areas
      .map(({ source, target }) => [coordSelector(source), coordSelector(target)])
      .reduce((prev, cur) => prev.concat(cur), []));
  }
})();