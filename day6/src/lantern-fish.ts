export class LanternFish {
  //#region Properties
  private _birthTimer: number = 0;
  public get birthTimer(): number {
    return this._birthTimer;
  }
  //#endregion

  //#region Ctor
  public constructor(private readonly _school: LanternFish[], initialBirthTimer: number|null) {
    if (initialBirthTimer === null) {
      initialBirthTimer = 8;
    }

    this._birthTimer = initialBirthTimer;
  }
  //#endregion

  //#region Properties
  public tick(): void {
    if (this._birthTimer === 0) {
      this._birthTimer = 6;
      this._school.push(new LanternFish(this._school, null));
      return;
    }

    this._birthTimer--;
  }
  //#endregion
}