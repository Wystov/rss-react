export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  gender: string;
  image?: FileList;
  country?: string;
  acceptTerms: NonNullable<boolean>;
};
