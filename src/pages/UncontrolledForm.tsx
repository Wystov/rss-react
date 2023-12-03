import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';

import { PasswordStrength } from '@/components/PasswordStrength';
import { SelectAutocomplete } from '@/components/SelectAutocomplete';
import router from '@/router';
import { setUncontrolledFormData } from '@/store/formsSlice';
import type { RootState } from '@/types';
import { convertToBase64 } from '@/utils/convertToBase64';
import { formSchema } from '@/utils/formSchema';
import { updatePasswordStrength } from '@/utils/updatePasswordStrength';

export const UncontrolledForm = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderMaleRadio = useRef<HTMLInputElement>(null);
  const genderFemaleRadio = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState('');
  const acceptTermsInput = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(4);

  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const genderCheckedValue = () => {
    if (genderMaleRadio.current?.checked) {
      return genderMaleRadio.current?.value;
    }
    if (genderFemaleRadio.current?.checked) {
      return genderFemaleRadio.current?.value;
    }
    return '';
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      confirmPassword: confirmPasswordInput.current?.value,
      name: nameInput.current?.value,
      age: ageInput.current?.value,
      gender: genderCheckedValue(),
      image: imageInput.current?.files,
      country,
      acceptTerms: acceptTermsInput.current?.checked,
    };

    const newErrors: Record<string, string> = {};

    try {
      await formSchema.validate(data, { abortEarly: false });
      setErrors(null);
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        updatePasswordStrength(data.password ?? '', setPasswordStrength);
      }
    }

    if (Object.keys(newErrors).length) return;

    const image = data.image?.[0];
    const imageBase64 = image && ((await convertToBase64(image)) as string);
    const dataWithImage = {
      ...data,
      image: imageBase64,
      timestamp: Date.now(),
    };
    dispatch(setUncontrolledFormData(dataWithImage));
    router.navigate('/');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Uncontrolled form</h1>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="email">
          E-mail:
          <input id="email" type="text" ref={emailInput} />
          {errors?.email && <span className="error">{errors.email}</span>}
        </label>

        <label htmlFor="password">
          Password:
          <input id="password" type="password" ref={passwordInput} />
          {errors?.password && <span className="error">{errors.password}</span>}
        </label>
        <PasswordStrength passwordStrength={passwordStrength} />

        <label htmlFor="confirmPassword">
          Confirm password:
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordInput}
          />
          {errors?.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </label>

        <SelectAutocomplete
          id="country"
          label="Country"
          options={countries}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCountry(e.target.value);
          }}
          value={country}
          setValue={setCountry}
          onValueSelected={(option) => setCountry(option)}
          mode="uncontrolled"
          error={errors?.country}
        />

        <label htmlFor="name">
          Name:
          <input id="name" type="text" ref={nameInput} />
          {errors?.name && <span className="error">{errors.name}</span>}
        </label>

        <div className="dbl-column">
          <div className="col">
            <label htmlFor="age">Age:</label>
            <input id="age" type="number" ref={ageInput} />
            {errors?.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="col">
            <span className="gender-label">Gender</span>
            <label htmlFor="gender-male">
              <input
                id="gender-male"
                name="gender"
                type="radio"
                value="male"
                ref={genderMaleRadio}
              />
              Male
            </label>
            <label htmlFor="gender-female">
              <input
                id="gender-female"
                name="gender"
                type="radio"
                value="female"
                ref={genderFemaleRadio}
              />
              Female
            </label>
            {errors?.gender && <span className="error">{errors.gender}</span>}
          </div>
        </div>

        <label htmlFor="image">
          Image:
          <input id="image" type="file" ref={imageInput} />
          {errors?.image && <span className="error">{errors.image}</span>}
        </label>

        <label htmlFor="acceptTerms">
          Accept terms:
          <input id="acceptTerms" type="checkbox" ref={acceptTermsInput} />
          {errors?.acceptTerms && (
            <span className="error">{errors.acceptTerms}</span>
          )}
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
