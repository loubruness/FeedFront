-- INITIALIZE DATABASE SCHEMA

CREATE TABLE user_app (
   Id SERIAL,
   hashed_password VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id)
);

CREATE TABLE student (
   Id INT,
   email VARCHAR(50),
   PRIMARY KEY(Id),
   UNIQUE(email),
   FOREIGN KEY(Id) REFERENCES user_app(Id)
);

CREATE TABLE teacher (
   Id INT,
   name VARCHAR(50),
   lastname VARCHAR(50),
   PRIMARY KEY(Id),
   FOREIGN KEY(Id) REFERENCES user_app(Id)
);

CREATE TABLE admin (
   Id INT,
   PRIMARY KEY(Id),
   FOREIGN KEY(Id) REFERENCES user_app(Id)
);

CREATE TABLE token_used (
   token TEXT,
   PRIMARY KEY(token)
);

CREATE TABLE forms (
   Id_form SERIAL,
   course_name VARCHAR(50) NOT NULL,
   level VARCHAR(50) NOT NULL,
   end_date TIMESTAMP,
   Id_admin INT NOT NULL,
   PRIMARY KEY(Id_form),
   UNIQUE(course_name),
   FOREIGN KEY(Id_admin) REFERENCES admin(Id)
);

CREATE TABLE fields (
   Id_form INT,
   Id_field SERIAL,
   name VARCHAR(200) NOT NULL,
   question TEXT,
   PRIMARY KEY(Id_form, Id_field),
   FOREIGN KEY(Id_form) REFERENCES forms(Id_form)
);

CREATE TABLE responses (
   Id_response SERIAL,
   Id_form INT NOT NULL,
   PRIMARY KEY(Id_response),
   FOREIGN KEY(Id_form) REFERENCES forms(Id_form)
);

CREATE TABLE teachers_forms (
   Id_teacher INT,
   Id_form INT,
   PRIMARY KEY(Id_teacher, Id_form),
   FOREIGN KEY(Id_teacher) REFERENCES teacher(Id),
   FOREIGN KEY(Id_form) REFERENCES forms(Id_form)
);

CREATE TABLE students_forms (
   Id_student INT,
   Id_form INT,
   token TEXT NOT NULL,
   PRIMARY KEY(Id_student, Id_form),
   UNIQUE(token),
   FOREIGN KEY(Id_student) REFERENCES student(Id),
   FOREIGN KEY(Id_form) REFERENCES forms(Id_form)
);

CREATE TABLE notes (
   Id_form INT,
   Id_field INT,
   Id_response INT,
   note DECIMAL(2, 0) NOT NULL,
   PRIMARY KEY(Id_form, Id_field, Id_response),
   FOREIGN KEY(Id_form, Id_field) REFERENCES fields(Id_form, Id_field),
   FOREIGN KEY(Id_response) REFERENCES responses(Id_response)
);

-- INSERT SAMPLE DATA

-- ...