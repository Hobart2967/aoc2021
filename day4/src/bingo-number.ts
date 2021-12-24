export class BingoNumber {
  //#region Properties
  public get value(): number {
    return this._value;
  }

  private _drawn: boolean = false;
  public get drawn(): boolean {
    return this._drawn;
  }
  public set drawn(v: boolean) {
    this._drawn = v;
  }
  //#endregion

  //#region Ctor
  public constructor(private readonly _value: number) {
  }
  //#endregion
}