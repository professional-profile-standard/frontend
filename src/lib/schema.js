
import {
    object,
    string,
    number,
    mixed,
    array,
    boolean,
    date,
    ref,
    lazy
} from 'yup';


export const locationSchema = object({
    country: string().required('Country is required'),
    state: string().nullable(),
    city: string().nullable(),
    village: string().nullable(),
    street: string().nullable(),
    postal_code: number()
        .integer('Postal code must be an integer')
        .positive('Postal code must be positive')
        .nullable(),
    address: string().nullable()
});

export const contactSchema = object({
    country_code: string().nullable(),
    phone_number: number()
        .integer('Phone number must be an integer')
        .positive('Phone number must be positive')
        .nullable(),
    phone_type: string().nullable(),
    email: string()
        .email('Invalid email format')
        .nullable(),
    website: string()
        .url('Invalid URL format')
        .nullable(),
});

export const personalDetailsSchema = object({
    first_name: string().required('First name is required'),
    middle_name: string().nullable(),
    last_name: string().nullable(),
    profile_pic: string()
        .url('Profile picture must be a valid URL')
        .nullable(),
    preferred_first_name: string().nullable(),
    contact: contactSchema.nullable().default(null),
    location: mixed()
        .test(
            'location-validation',
            'Location must be a string or Location object',
            (value) => {
                if (value === null || value === undefined) return true;
                if (typeof value === 'string') return true;
                if (typeof value === 'object' && value !== null) {
                    try {
                        locationSchema.validateSync(value, { strict: false });
                        return true;
                    } catch {
                        return false;
                    }
                }
                return false;
            }
        )
        .nullable()
        .default(null),
    gender: string().nullable().default(null),
    race: string().nullable().default(null)
});
export const educationSchema = object().shape({
    institute_name: string().required(),
    degree_name: string().required(),
    field: string().nullable(),
    subfield: string().nullable(),
    specialization: string().nullable(),
    cgpa: string().nullable(),
    achievements: array().of(string()).default([]),
    location: string().nullable(),
    duration: string().nullable(),
    start_date: date().nullable(),
    end_date: date().nullable(),
});

export const linkSchema = object().shape({
    url: string().url().required(),
    name: string().nullable(),
    url_text: string().nullable(),
});

export const professionalSummarySchema = object({
    title: string().required('Title is required'),
    summary: string().required('Summary is required')
});

export const skillsSchema = object().test('skills-type', 'Skills must be a dictionary of string arrays',
    (value) => {
        if (value === undefined) return true; // Optional
        return Object.values(value).every(arr => Array.isArray(arr) && arr.every(item => typeof item === 'string'));
    }
).default({});

export const experienceSchema = object({
    title: string().required('Title is required'),
    organization: string().required('Organization is required'),
    description: string().nullable(),
    location: mixed().nullable(),
    logo: string().url().nullable(),
    is_current: boolean().nullable(),
    duration: string().nullable(),
    start_date: date().nullable(),
    end_date: date().nullable(),
    experience_type: string().nullable(),
    contributions: array().of(string()).default([]),
    achievements: array().of(string()).default([]),
    technologies: array().of(string()).default([]),
});