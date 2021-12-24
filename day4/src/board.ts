import { BingoNumber } from './bingo-number';

export class Board {

  //#region Properties
  private _rows: BingoNumber[][] = [];
  public get rows(): BingoNumber[][] {
    return this._rows;
  }

  private _columns: BingoNumber[][] = [];
  public get columns(): BingoNumber[][] {
    return this._columns;
  }
  //#endregion

  //#region Ctor
  public constructor(rows: number[][]) {
    this.buildMatrices(rows);
  }
  //#endregion

  //#region Public Methods
  public buildMatrices(rows: number[][]) {
    this._rows = rows.map(row =>
      row.map(row =>
        new BingoNumber(row)));

    const columns = Array
      .from(new Array(this.rows.length))
      .map(() => Array.from(new Array(this.rows.length)));

    this.rows.forEach((row, rowIndex) =>
      row.forEach((bingoNumber, columnIndex) =>
        columns[columnIndex][rowIndex] = bingoNumber));
    this._columns = columns;
  }

  public onNumberDrawn(number: number): boolean {
    this.updateRows(number);

    const possibleBingos = [
      this.rows
        .find(row => row.every(number => number.drawn)),
      this.columns
        .find(column => column.every(number => number.drawn))
    ];

    return !!possibleBingos.find(x => !!x)
  }

  public updateRows(number: number): void {
    this.rows.forEach(row =>
      row
        .filter(bingoNumber => bingoNumber.value === number)
        .forEach(x => x.drawn = true));
  }
  //#endregion
}