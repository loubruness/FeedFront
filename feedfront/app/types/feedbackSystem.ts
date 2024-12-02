/**
 * Feild for a form
 */
export type Field = {
  id_field: number;
  title: string;
  question: string;
};
export type Form = {
  id_form: number;
  id_admin: number;
  course_name: string;
  end_date: Date;
  status: string;
};
/**
 * Form of a course with its fields
 */
export type FormWithFields = {
  id_form: number;
  course_name: string;
  status?: string;
  fields: Array<Field>;
};
/**
 * Grade for a field
 */
export type Grade = {
  id_field: number;
  grade: number;
};
/**
 * Answer of a form from a student
 */
export type Answer = {
  id_form: number;
  grades: Grade[];
};