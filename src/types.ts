import { UseFormSetValue } from 'react-hook-form';

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  gender: string;
  image?: FileList;
  country: string;
  acceptTerms: NonNullable<boolean>;
};

export type SelectCountriesProps = {
  id: keyof Inputs;
  label: string;
  options: string[];
  onChange: (...event: unknown[]) => void;
  value: string;
  setValue: UseFormSetValue<Inputs>;
  trigger: (field: keyof Inputs) => void;
};
