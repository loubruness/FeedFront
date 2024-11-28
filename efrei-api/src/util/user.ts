class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export { User };
