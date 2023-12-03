import { ChangeEvent } from 'react';
import { FieldError, UseFormSetValue } from 'react-hook-form';

import { store } from './store';

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  gender: string;
  image: FileList;
  country: string;
  acceptTerms: NonNullable<boolean>;
};

export type SelectCountriesProps = {
  id: keyof Inputs;
  label: string;
  options: string[];
  onChange:
    | ((...event: unknown[]) => void)
    | ((event: ChangeEvent<HTMLInputElement>) => void);
  value: string;
  setValue: UseFormSetValue<Inputs>;
  trigger?: (field: keyof Inputs) => void;
  onValueSelected?: (value: string) => void;
  mode: 'rhf' | 'uncontrolled';
  error?: FieldError | string;
};

export type RootState = ReturnType<typeof store.getState>;

export type PasswordStrengthOption = {
  message: string;
  color: string;
  percent: number;
};

export type PasswordStrengthProps = {
  passwordStrength: number;
};

export type SubmittedFormFields = {
  timestamp: number;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  gender: string;
  image: string;
  country: string;
  acceptTerms: boolean;
};

export type SubmittedFormProps = {
  data: SubmittedFormFields[];
};
