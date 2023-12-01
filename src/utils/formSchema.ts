import * as yup from 'yup';

import countries from '../utils/countries.json';

const MAX_FILE_SIZE = 1000000;
const validFileTypes = ['image/jpeg', 'image/png'];

export const formSchema = yup.object({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Email is required')
    .matches(
      /^((?:[A-Za-z0-9!#$%&'*+\-\\/=?^_`{|}~]|(?:=^|\.)"|"(?=$|\.|@)|(?:=".*)[ .](?=.*")|(?:!\.)\.){1,64})(@)((?:[A-Za-z0-9.\\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/,
      'Please enter valid email address'
    ),

  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character')
    .min(8, 'Must be at least 8 characters long'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], "Passwords don't match"),

  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-Я][a-zA-Zа-яА-Я]*$/, 'First letter must be uppercase'),

  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required()
    .integer()
    .positive('Age must be a positive number'),

  gender: yup.string().required('Please select gender'),

  image: yup
    .mixed<FileList>()
    .required('Please upload image')
    .test('valid type', 'Only JPEG or PNG allowed', (fileList) => {
      const file = fileList && fileList[0];
      if (!file) return true;
      return file && validFileTypes.includes(file.type);
    })
    .test('valid size', 'Max allowed size is 1mb', (fileList) => {
      const file = fileList && fileList[0];
      if (!file) return true;
      return file && file.size <= MAX_FILE_SIZE;
    }),

  country: yup
    .string()
    .required()
    .oneOf(countries, 'Please select country from the list'),

  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms')
    .required(),
});
