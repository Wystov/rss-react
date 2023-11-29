import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Inputs } from '@/types';
import { formSchema } from '@/utils/formSchema';

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <h1>React hook form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">e-mail</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}

        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <span className="error">{errors.age.message}</span>}

        <span>Gender</span>
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

        <label htmlFor="image">Image</label>
        <input id="image" type="file" {...register('image')} />
        {errors.image && <span className="error">{errors.image.message}</span>}

        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} />
        {errors.country && (
          <span className="error">{errors.country.message}</span>
        )}

        <label htmlFor="acceptTerms">Accept terms</label>
        <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
        {errors.acceptTerms && (
          <span className="error">{errors.acceptTerms.message}</span>
        )}

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
