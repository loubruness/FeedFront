class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      role: string
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.role = role;
    }
  }
  
  export { User };