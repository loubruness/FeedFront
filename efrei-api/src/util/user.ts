enum Level {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  I1 = "I1",
  I2 = "I2",
}

class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  level?: Level;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    level?: Level
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.level = level ?? undefined;
  }
}

export { User, Level };
