class Student {
    id: number;
    email: string;
}

class Class {
    students : Array<Student>;
}

class Course {
    name : string;
}

export { Student, Class, Course };