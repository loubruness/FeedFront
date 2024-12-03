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
   end_date TIMESTAMP,
   Id_admin INT NOT NULL,
   PRIMARY KEY(Id_form),
   UNIQUE(course_name),
   FOREIGN KEY(Id_admin) REFERENCES admin(Id)
);

CREATE TABLE fields (
   Id_form INT,
   Id_field SERIAL,
   title VARCHAR(200) NOT NULL,
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

INSERT INTO forms (course_name, end_date, Id_admin) VALUES ('Default', '2021-12-31', 11);
INSERT INTO forms (course_name, end_date, Id_admin) VALUES ('Financial Management', '2024-12-31', 11);

INSERT INTO fields (Id_form, title, question) VALUES (1, 'Satisfaction', 'Overall, I am satisfied with the lessons with this teacher');
INSERT INTO fields (Id_form, title, question) VALUES (1, 'Availability', 'The teacher is available and listens to us');
INSERT INTO fields (Id_form, title, question) VALUES (1, 'Clarity', 'The objectives of the module and the assessment methods are clearly stated');
INSERT INTO fields (Id_form, title, question) VALUES (1, 'Resources', 'The educational resources are adapted');
INSERT INTO fields (Id_form, title, question) VALUES (1, 'Coordination', 'Coordination of the module is good');

INSERT INTO fields (Id_form, title, question) VALUES (2, 'Satisfaction', 'Overall, I am satisfied with the lessons with this teacher');
INSERT INTO fields (Id_form, title, question) VALUES (2, 'Availability', 'The teacher is available and listens to us');
INSERT INTO fields (Id_form, title, question) VALUES (2, 'Clarity', 'The objectives of the module and the assessment methods are clearly stated');
INSERT INTO fields (Id_form, title, question) VALUES (2, 'Resources', 'The educational resources are adapted');
INSERT INTO fields (Id_form, title, question) VALUES (2, 'Coordination', 'Coordination of the module is good');

-- Insert sample responses
INSERT INTO responses (Id_form) VALUES (1);
INSERT INTO responses (Id_form) VALUES (1);
INSERT INTO responses (Id_form) VALUES (1);

INSERT INTO responses (Id_form) VALUES (2);
INSERT INTO responses (Id_form) VALUES (2);
INSERT INTO responses (Id_form) VALUES (2);

-- Insert sample grades for form 1 including Resources and Coordination
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 1, 1, 4); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 2, 1, 5); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 3, 1, 3); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 4, 1, 4); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 5, 1, 5); -- Coordination

INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 1, 2, 3); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 2, 2, 4); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 3, 2, 2); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 4, 2, 3); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 5, 2, 4); -- Coordination

INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 1, 3, 5); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 2, 3, 4); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 3, 3, 4); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 4, 3, 5); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (1, 5, 3, 5); -- Coordination



INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 6, 1, 2); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 7, 1, 3); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 8, 1, 4); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 9, 1, 2); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 10, 1, 2); -- Coordination

INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 6, 2, 1); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 7, 2, 1); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 8, 2, 2); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 9, 2, 3); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 10, 2, 3); -- Coordination

INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 6, 3, 3); -- Satisfaction
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 7, 3, 4); -- Availability
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 8, 3, 3); -- Clarity
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 9, 3, 5); -- Resources
INSERT INTO grades (Id_form, Id_field, Id_response, grade) VALUES (2, 10, 3, 2); -- Coordination
-- ...