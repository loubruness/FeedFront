-- INITIALIZE DATABASE SCHEMA
CREATE TYPE status AS ENUM ('default', 'draft', 'finalized', 'current', 'past');
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
   course_name VARCHAR(100) NOT NULL,
   end_date TIMESTAMP,
   Id_admin INT NOT NULL,
   status status DEFAULT 'draft',
   PRIMARY KEY(Id_form),
   UNIQUE(course_name),
   FOREIGN KEY(Id_admin) REFERENCES admin(Id)
);

CREATE TABLE fields (
   Id_form INT,
   Id_field SERIAL,
   title VARCHAR(200) NOT NULL,
   question TEXT,
   editable BOOLEAN DEFAULT TRUE,
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

CREATE TABLE grades (
   Id_form INT,
   Id_field INT,
   Id_response INT,
   grade DECIMAL(2, 0) NOT NULL,
   PRIMARY KEY(Id_form, Id_field, Id_response),
   FOREIGN KEY(Id_form, Id_field) REFERENCES fields(Id_form, Id_field),
   FOREIGN KEY(Id_response) REFERENCES responses(Id_response)
);

-- INSERT SAMPLE DATA
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');
INSERT INTO user_app (hashed_password) VALUES ('1234');

INSERT INTO student (Id, email) VALUES (1, 'arthur@mail.com');
INSERT INTO student (Id, email) VALUES (2, 'pauline@mail.com');
INSERT INTO student (Id, email) VALUES (3, 'lou@mail.com');
INSERT INTO student (Id, email) VALUES (4, 'hugo@mail.com');
INSERT INTO student (Id, email) VALUES (5, 'asma@mail.com');

INSERT INTO teacher (Id, name, lastname) VALUES (6, 'michel', 'dupont');
INSERT INTO teacher (Id, name, lastname) VALUES (7, 'jean', 'martin');
INSERT INTO teacher (Id, name, lastname) VALUES (8, 'pierre', 'durand');
INSERT INTO teacher (Id, name, lastname) VALUES (9, 'luc', 'dubois');
INSERT INTO teacher (Id, name, lastname) VALUES (10, 'marie', 'bernard');

INSERT INTO admin (Id) VALUES (11);
INSERT INTO admin (Id) VALUES (12);
INSERT INTO admin (Id) VALUES (13);
INSERT INTO admin (Id) VALUES (14);
INSERT INTO admin (Id) VALUES (15);

INSERT INTO forms (course_name, end_date, Id_admin, status) VALUES ('Default', '2021-12-31', 11, 'default');

INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Satisfaction', 'Overall, I am satisfied with the lessons with this teacher', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Availability', 'The teacher is available and listens to us', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Clarity', 'The objectives of the module and the assessment methods are clearly stated', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Resources', 'The educational resources are adapted', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Coordination', 'Coordination of the module is good', FALSE);

-- ...