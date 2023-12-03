import { PasswordStrengthProps } from '@/types';
import { PASSWORD_STRENGTH_OPTIONS } from '@/utils/updatePasswordStrength';

import style from './style.module.css';

export const PasswordStrength = ({
  passwordStrength,
}: PasswordStrengthProps) => {
  return (
    <div className={style['password-strength']}>
      <div>Strength: {PASSWORD_STRENGTH_OPTIONS[passwordStrength].message}</div>
      <div className={style['progress-bar-container']}>
        <div
          className={style['progress-bar']}
          style={{
            width: `${PASSWORD_STRENGTH_OPTIONS[passwordStrength].percent}%`,
            backgroundColor: PASSWORD_STRENGTH_OPTIONS[passwordStrength].color,
          }}
        />
      </div>
    </div>
  );
};
