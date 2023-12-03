import { Dispatch, SetStateAction } from 'react';
import { ValidationError } from 'yup';

import { PasswordStrengthOption } from '@/types';

import { formSchema } from './formSchema';

export const PASSWORD_STRENGTH_OPTIONS: Record<number, PasswordStrengthOption> =
  {
    0: {
      message: 'Strong',
      color: 'green',
      percent: 100,
    },
    1: {
      message: 'Almost good',
      color: 'yellow',
      percent: 75,
    },
    2: {
      message: 'Weak',
      color: 'red',
      percent: 50,
    },
    3: {
      message: 'Very weak',
      color: 'red',
      percent: 25,
    },
    4: {
      message: 'No password',
      color: 'red',
      percent: 0,
    },
  };

export const updatePasswordStrength = async (
  password: string,
  setPasswordStrength: Dispatch<SetStateAction<number>>
) => {
  if (!password.length) {
    setPasswordStrength(4);
    return;
  }
  try {
    await formSchema.validate({ password }, { abortEarly: false });
  } catch (e) {
    const errors = e instanceof ValidationError ? e.inner : [];
    const errorsCount = errors.filter(
      (error) => error.path === 'password'
    ).length;

    setPasswordStrength(errorsCount >= 3 ? 3 : errorsCount);
  }
};
