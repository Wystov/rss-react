import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';

import { PasswordStrength } from '@/components/PasswordStrength';
import { SelectAutocomplete } from '@/components/SelectAutocomplete';
import router from '@/router';
import { setControlledFormData } from '@/store/formsSlice';
import type { Inputs, RootState } from '@/types';
import { convertToBase64 } from '@/utils/convertToBase64';
import { formSchema } from '@/utils/formSchema';
import { updatePasswordStrength } from '@/utils/updatePasswordStrength';

export const ReactHookForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    delayError: 500,
    defaultValues: {
      country: '',
    },
  });

  const [passwordStrength, setPasswordStrength] = useState(4);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const image = data.image[0];
    const imageBase64 = (await convertToBase64(image)) as string;
    const dataWithImage = {
      ...data,
      image: imageBase64,
      timestamp: Date.now(),
    };
    dispatch(setControlledFormData(dataWithImage));
    router.navigate('/');
  };

  const passwordValue = watch('password', '');

  useEffect(() => {
    updatePasswordStrength(passwordValue, setPasswordStrength);
  }, [passwordValue]);

  return (
    <div className="form-container">
      <h1 className="form-title">React hook form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          E-mail:
          <input id="email" type="text" {...register('email')} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>

        <label htmlFor="password">
          Password:
          <input id="password" type="password" {...register('password')} />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </label>
        <PasswordStrength passwordStrength={passwordStrength} />

        <label htmlFor="confirmPassword">
          Confirm password:
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </label>

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <SelectAutocomplete
              id="country"
              label="Country"
              options={countries}
              onChange={field.onChange}
              value={field.value}
              setValue={setValue}
              trigger={trigger}
              mode="rhf"
              error={errors.country}
            />
          )}
        />

        <label htmlFor="name">
          Name:
          <input id="name" type="text" {...register('name')} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>

        <div className="dbl-column">
          <div className="col">
            <label htmlFor="age">Age:</label>
            <input id="age" type="number" {...register('age')} />
            {errors.age && <span className="error">{errors.age.message}</span>}
          </div>
          <div className="col">
            <span className="gender-label">Gender</span>
            <label htmlFor="gender-male">
              <input
                id="gender-male"
                type="radio"
                value="male"
                {...register('gender')}
              />
              Male
            </label>
            <label htmlFor="gender-female">
              <input
                id="gender-female"
                type="radio"
                value="female"
                {...register('gender')}
              />
              Female
            </label>
            {errors.gender && (
              <span className="error">{errors.gender.message}</span>
            )}
          </div>
        </div>

        <label htmlFor="image">
          Image:
          <input id="image" type="file" {...register('image')} />
          {errors.image && (
            <span className="error">{errors.image.message}</span>
          )}
        </label>

        <label htmlFor="acceptTerms">
          Accept terms:
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
          />
          {errors.acceptTerms && (
            <span className="error">{errors.acceptTerms.message}</span>
          )}
        </label>

        <button type="submit" disabled={!isValid}>
          submit
        </button>
      </form>
    </div>
  );
};
