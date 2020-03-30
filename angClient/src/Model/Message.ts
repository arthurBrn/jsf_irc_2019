export class Message {
  private _id: number;
  private _content: string;
  private _channelId: number;
  private _userId: number;
  private _pseudo: string;
  private _date: string;

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  get content(): string { return this._content; }
  set content(value: string) { this._content = value; }
  get channelId(): number { return this._channelId; }
  set channelId(value: number) { this._channelId = value; }
  get userId(): number { return this._userId; }
  set userId(value: number) { this._userId = value; }
  get pseudo(): string { return this._pseudo; }
  set pseudo(value: string) { this._pseudo = value; }
  get date(): string { return this._date; }
  set date(value: string) { this._date = value; }



}
