import { useState } from 'react';

import { SelectCountriesProps } from '@/types';

import style from './style.module.css';

export const SelectAutocomplete = ({
  id,
  label,
  options,
  onChange,
  value,
  setValue,
  trigger,
}: SelectCountriesProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 300);
  };

  const filteredOptions = () =>
    options
      .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
      .map((option) => (
        <li
          className={style.option}
          key={option}
          onClick={() => {
            setValue(id, option);
            trigger(id);
          }}
        >
          {option}
        </li>
      ));

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={style['select-container']}>
        <input
          id={id}
          type="text"
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={onChange}
          onBlur={handleInputBlur}
        />
        {isOpen && (
          <ul className={style['option-list']}>{filteredOptions()}</ul>
        )}
      </div>
    </>
  );
};
