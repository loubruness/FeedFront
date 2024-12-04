import {
    createFormWithFields,
    deleteForm,
    getFormById,
    getFormWithFields,
    getForms,
    updateForm,
    updateFormWithFields
} from '../database/queries/forms';
import nodeSchedule from 'node-schedule';
import { sendFormToStudentsByCourseFunction } from './email';

const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const SECRET_KEY = process.env.SECRET_KEY;
const EFREI_API_KEY = process.env.EFREI_API_KEY || "";

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

if (!EFREI_API_KEY) {
    throw new Error("EFREI_API_KEY is not defined in the environment variables");
}

const RESPONSE_DELAY = 1; // Delay for response in months
const DELETE_DELAY = 6; // Delay for deletion in months

/**
 * Fetches all forms from the database.
 */
export async function getFormsAction(request, response) {
    try {
        const forms = await getForms();
        response.status(200).json(forms);
    } catch (error) {
        console.error("Error in getFormsAction:", error);
        response.status(500).json({ error: 'Failed to fetch forms' });
    }
}

/**
 * Fetches a form along with its fields by ID.
 */
export async function getFormWithFieldsAction(request, response) {
    try {
        const id_form = parseInt(request.params.id_form);
        if (!id_form) {
            return response.status(400).json({ error: 'id_form is required' });
        }

        const form = await getFormWithFields(id_form);
        if (!form) {
            return response.status(404).json({ error: `Form with ID ${id_form} not found` });
        }

        response.status(200).json(form);
    } catch (error) {
        console.error("Error in getFormWithFieldsAction:", error);
        response.status(500).json({ error: 'Failed to fetch form with fields' });
    }
}

/**
 * Creates a new form with fields.
 */
export async function createFormWithFieldsAction(request, response) {
    try {
        const { course_name, user_id } = request.body;

        if (!course_name) {
            return response.status(400).json({ error: 'course_name is required' });
        }

        const courses = await fetchCoursesAction();
        const course = courses.find(course => course.name === course_name);
        if (!course) {
            return response.status(404).json({ error: `Course ${course_name} not found` });
        }

        const end_date = course.end_date;
        const id_admin = user_id || 11; // Default admin ID
        const form = await createFormWithFields({ ...request.body, end_date, id_admin });

        response.status(201).json(form);
    } catch (error) {
        console.error("Error in createFormWithFieldsAction:", error);
        response.status(500).json({ error: 'Failed to create form:' });
    }
}

/**
 * Updates a form with fields if it is in draft status.
 */
export async function updateFormWithFieldsAction(request, response) {
    try {
        const id_form = parseInt(request.params.id_form);
        const { course_name, user_id } = request.body;

        if (!id_form || !course_name) {
            return response.status(400).json({ error: 'id_form and course_name are required' });
        }

        const db_form = await getFormById(id_form);
        if (!db_form) {
            return response.status(404).json({ error: `Form ${id_form} not found` });
        }

        if (db_form.status !== 'draft') {
            return response.status(400).json({ error: `Form ${id_form} is not in draft status` });
        }

        const courses = await fetchCoursesAction();
        const course = courses.find(course => course.name === course_name);
        if (!course) {
            return response.status(404).json({ error: `Course ${course_name} not found` });
        }

        const updatedForm = await updateFormWithFields({
            ...request.body,
            end_date: course.end_date,
            id_admin: user_id || 11
        });

        response.status(200).json(updatedForm);
    } catch (error) {
        console.error("Error in updateFormWithFieldsAction:", error);
        response.status(500).json({ error: 'Failed to update form' });
    }
}

/**
 * Finalizes a draft form, schedules it for sending, and sets its status to "finalized".
 */
export async function finalizeFormAction(request, response) {
    try {
        const id_form = parseInt(request.params.id_form);
        if (!id_form) {
            return response.status(400).json({ error: 'id_form is required' });
        }

        const form = await getFormById(id_form);
        if (!form) {
            return response.status(404).json({ error: `Form ${id_form} not found` });
        }

        if (form.status !== 'draft') {
            return response.status(400).json({ error: `Form ${id_form} is not in draft status` });
        }

        await updateForm({ ...form, status: 'finalized' });

        nodeSchedule.scheduleJob(new Date(form.end_date), async () => {
            await sendFormAction(id_form);
        });

        response.status(200).json({ message: `Form ${id_form} finalized and scheduled` });
    } catch (error) {
        console.error("Error in finalizeFormAction:", error);
        response.status(500).json({ error: 'Failed to finalize form' });
    }
}

/**
 * Sends a form to students based on the course.
 */
async function sendFormAction(id_form: number) {
    try {
        const form = await getFormById(id_form);
        if (!form) {
            throw new Error(`Form ${id_form} not found`);
        }

        const end_date = new Date(form.end_date);
        end_date.setMonth(end_date.getMonth() + RESPONSE_DELAY);

        await updateForm({ ...form, end_date, status: 'current' });
        await sendFormToStudentsByCourseFunction(form.course_name, end_date);

        nodeSchedule.scheduleJob(end_date, async () => {
            await closeFormAction(id_form);
        });

        console.log(`Form ${id_form} sent and scheduled to close`);
    } catch (error) {
        console.error("Error in sendFormAction:", error);
    }
}

/**
 * Closes a form by setting its status to "past".
 */
async function closeFormAction(id_form: number) {
    try {
        const form = await getFormById(id_form);
        if (!form) {
            throw new Error(`Form ${id_form} not found`);
        }

        await updateForm({ ...form, status: 'past' });
        console.log(`Form ${id_form} closed`);
    } catch (error) {
        console.error("Error in closeFormAction:", error);
    }
}

/**
 * Deletes a form by ID.
 */
export async function deleteFormAction(request, response) {
    try {
        const id_form = parseInt(request.params.id_form);
        if (!id_form) {
            return response.status(400).json({ error: 'id_form is required' });
        }

        await deleteForm(id_form);
        response.status(200).json({ message: `Form ${id_form} deleted` });
    } catch (error) {
        console.error("Error in deleteFormAction:", error);
        response.status(500).json({ error: 'Failed to delete form' });
    }
}

/**
 * Fetches course names that do not have associated forms.
 */
export async function getCoursesNamesWithoutFormAction(request, response) {
    try {
        const courses = await fetchCoursesAction();
        const forms = await getForms();
        const courseNamesWithForms = forms.map(form => form.course_name);

        const coursesWithoutForms = courses
            .filter(course => !courseNamesWithForms.includes(course.name))
            .map(course => course.name);

        response.status(200).json(coursesWithoutForms);
    } catch (error) {
        console.error("Error in getCoursesNamesWithoutFormAction:", error);
        response.status(500).json({ error: 'Failed to fetch courses without forms' });
    }
}

/**
 * Fetches courses from the EFREI API.
 */
async function fetchCoursesAction(): Promise<Course[]> {
    try {
        const response = await fetch(`${EFREI_API_URL}/course`);
        if (!response.ok) {
            throw new Error(`Failed to fetch courses, status: ${response.status}`);
        }
        const data = await response.json();
        return data.courses;
    } catch (error) {
        console.error("Error in fetchCoursesAction:", error);
        throw new Error("Failed to fetch courses from EFREI API");
    }
}

type Course = {
    id: number;
    name: string;
    end_date: Date;
};
