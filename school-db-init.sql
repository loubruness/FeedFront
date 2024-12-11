-- INITIALIZE DATABASE SCHEMA

CREATE TABLE EfreiUser (
   id SERIAL PRIMARY KEY,
   firstname TEXT NOT NULL,
   lastname TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   role VARCHAR(50) NOT NULL
);

CREATE TABLE Course (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   end_date TIMESTAMP
);

CREATE TABLE efreiuser_course (
   efreiuser_id INT,
   course_id INT,
   PRIMARY KEY (efreiuser_id, course_id),
   FOREIGN KEY (efreiuser_id) REFERENCES EfreiUser(id) ON DELETE CASCADE,
   FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE
);


-- ADD DEFAULT ENTRIES

-- Admins

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Admin', 'ADMIN', 'admin@efrei.fr', 'pass', 'admin');
INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Admin2', 'ADMIN2', 'admin2@efrei.fr', 'pass', 'admin');

-- Teachers

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Teacher', 'TEACHER', 'teacher@efrei.fr', 'pass', 'teacher');
INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Teacher2', 'TEACHER2', 'teacher2@efrei.fr', 'pass', 'teacher');

-- Students

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Student', 'STUDENT', 'student@efrei.net', 'pass', 'student');
INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('Student2', 'STUDENT2', 'student2@efrei.net', 'pass', 'student');

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('arthur', 'BILLEBAUT', 'arthur.billebaut@efrei.net', 'pass', 'student');

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('lou', 'BRUNESSEAUX', 'lou.brunesseaux@efrei.net', 'pass', 'student');

INSERT INTO EfreiUser (firstname, lastname, email, password, role)
VALUES ('lou', 'BRUNESSEAUX', 'loubruness@gmail.com', 'pass', 'student');

-- Courses

INSERT INTO Course (name, end_date)
VALUES ('ST2APR - Advanced Programming (I3, I3-PRO - 2425S9)', '2024-12-11');
INSERT INTO Course (name, end_date)
VALUES ('ST2TST - Software Testing (I3, I3-PRO - 2425S9)', '2024-12-11');
INSERT INTO Course (name, end_date)
VALUES ('ST2SSA - Software Systems Architectures  (I3, I3-PRO - 2425S9)', '2024-12-11');
INSERT INTO Course (name, end_date)
VALUES ('SP201I - From the Atom to the Microchip (P1-INT - 2425S2)', '2024-12-11');
INSERT INTO Course (name, end_date)
VALUES ('SP106I - General Electricity (P1-INT - 2425S1)', '2024-12-11');

INSERT INTO Course (name, end_date)
VALUES ('ST2APR - Advanced Architecture (I3, I3-PRO - 2425S9)', '2024-12-11');
-- Assign courses to teachers

INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (3, 1);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (3, 2);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (3, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (4, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (4, 4);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (4, 5);

-- Assign courses to students

INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (5, 1);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (5, 2);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (5, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (6, 4);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (6, 5);

INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (7, 1);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (7, 2);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (7, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (7, 4);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (7, 5);

INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (8, 1);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (8, 2);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (8, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (8, 4);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (8, 5);

INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (9, 1);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (9, 2);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (9, 3);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (9, 4);
INSERT INTO efreiuser_course (efreiuser_id, course_id)
VALUES (9, 5);