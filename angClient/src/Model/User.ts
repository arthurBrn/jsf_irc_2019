export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;

  constructor(id: number, firstName: string, lastName: string, email: string, password: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  get id(): number { return this.id; }
  set id(value: number) { this.id = value; }
  get firstName(): string { return this._firstName; }
  set firstName(value: string) { this._firstName = value; }
  get lastName(): string { return this._lastName; }
  set lastName(value: string) { this._lastName = value; }
  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }
  get password(): string { return this.password; }
  set password(value: string) { this.password = value; }
}
