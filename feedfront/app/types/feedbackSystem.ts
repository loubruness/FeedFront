/**
 * Feild for a form
 */
export type Field = {
    id_field: number;
    title: string;
    question: string;
  };
  /**
   * Form of a course
   */
  export type FormWithFields = {
    id_form: number;
    course_name: string;
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