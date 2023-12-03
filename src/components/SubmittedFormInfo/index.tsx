import { SubmittedFormProps } from '@/types';

import style from './style.module.css';

export const SubmittedFormInfo = ({ data }: SubmittedFormProps) => {
  console.log(data);
  return (
    <>
      {data.map(
        (
          {
            timestamp,
            email,
            password,
            confirmPassword,
            name,
            age,
            gender,
            image,
            country,
            acceptTerms,
          },
          i
        ) => (
          <div className={style.card} key={i}>
            <p>
              <b>Time: </b>
              {new Date(timestamp).toString()}
            </p>
            <p>
              <b>Email: </b>
              {email}
            </p>
            <p>
              <b>Password: </b>
              {password}
            </p>
            <p>
              <b>Confirm password: </b>
              {confirmPassword}
            </p>
            <p>
              <b>Name: </b>
              {name}
            </p>
            <p>
              <b>Age: </b>
              {age}
            </p>
            <p>
              <b>Gender: </b>
              {gender}
            </p>
            <p>
              <b>Country: </b>
              {country}
            </p>
            <p>
              <b>Accept terms: </b>
              {acceptTerms.toString()}
            </p>
            <p>
              <b>Image preview: </b>
              <img src={image} className={style.image} alt="image preview" />
            </p>
          </div>
        )
      )}
    </>
  );
};
