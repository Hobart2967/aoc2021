import * as fs from 'fs';
import * as path from 'path';
import { Board } from './board';

(() => {
  const inputs = fs
    .readFileSync(path.join(__dirname, 'inputs'))
    .toString()
    .split('\n')

  const randomNumbers = inputs
    .splice(0, 1)[0]
    .split(',')
    .map(x => parseInt(x, 10));

  const boardsLoaded: Board[] = [];
  while (inputs.length) {
    inputs.splice(0, 1);
    boardsLoaded.push(new Board(inputs
      .splice(0, 5)
      .map(row => row
        .split(' ')
        .filter(x => !!x)
        .map(x => parseInt(x, 10)))));
  }

  let boardsToCheck = boardsLoaded;
  let boardsWon: { board: Board; randomNumber: number }[] = [];
  for (const randomNumber of randomNumbers) {
    const boards = boardsToCheck
      .map(board => ({
        board,
        bingo: board.onNumberDrawn(randomNumber)
      }))
      .filter(({bingo}) => !!bingo)
      .map(x => x.board);

    boardsWon = boardsWon.concat(
      boards.map(board => ({
        board,
        randomNumber
      })));

    boardsToCheck = boardsToCheck.filter(board =>
      !boardsWon.map(board => board.board).includes(board));

    if (!boardsToCheck.length) {
      break;
    }
  }

  function printBoard(position: string, boardsWon: { board: Board; randomNumber: number; }) {
    const { board, randomNumber } = boardsWon;
    const sum = board.rows
      .reduce((cur, prev) => cur.concat(prev), [])
      .filter(x => !x.drawn)
      .reduce((cur, prev) => cur += prev.value, 0);
    console.log(`${position} Bingo on Board #${boardsLoaded.indexOf(board) + 1} with random number ${randomNumber}! Result is: ${sum * randomNumber}`);
  }

  printBoard('First', boardsWon[0]);
  printBoard('Last', boardsWon[boardsWon.length - 1]);

})();

