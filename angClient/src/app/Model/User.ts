export class User {
  id: number;
  name: string;
  pseudo: string;
  email: string;
  password: string;

  constructor(id: number, name: string, pseudo: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
  }
}
