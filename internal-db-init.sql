-- INITIALIZE DATABASE SCHEMA
CREATE TYPE status AS ENUM ('default', 'draft', 'finalized', 'current', 'past');
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
   UNIQUE(course_name)
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
   FOREIGN KEY(Id_form) REFERENCES forms(Id_form)
);

CREATE TABLE students_forms (
   Id_student INT,
   Id_form INT,
   token TEXT NOT NULL,
   PRIMARY KEY(Id_student, Id_form),
   UNIQUE(token),
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
INSERT INTO forms (course_name, end_date, Id_admin, status) VALUES ('Default', '2021-12-31', 1, 'default');

INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Satisfaction', 'Overall, I am satisfied with the lessons with this teacher', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Availability', 'The teacher is available and listens to us', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Clarity', 'The objectives of the module and the assessment methods are clearly stated', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Resources', 'The educational resources are adapted', FALSE);
INSERT INTO fields (Id_form, title, question, editable) VALUES (1, 'Coordination', 'Coordination of the module is good', FALSE);

-- ...