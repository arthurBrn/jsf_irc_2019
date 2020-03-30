export class Channels {
  private _id: number;
  private _name: string;
  private _stared: boolean;

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get stared(): boolean {
    return this._stared;
  }
  set stared(value: boolean) {
    this._stared = value;
  }
}
