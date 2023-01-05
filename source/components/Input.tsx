import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { classNames } from '../util/classNames';

type InputProps = {
  register: UseFormRegister<FieldValues>;
  field: string;
  rules: RegisterOptions;
  errors: FieldErrors;
  errorMessage: string;
  label?: string;
  extraStyles?: string;
};

export const Input = ({ register, field, rules, errors, errorMessage, label, extraStyles }: InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='font-sans text-sm font-medium text-gray-500 uppercase'>{label || field}</label>
      <input
        {...register(field, rules)}
        className={classNames(
          'relative w-full h-10 pl-3 pr-10 text-left bg-white border border-gray-200 rounded-lg shadow-md cursor-default focus:border-0 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm',
          extraStyles || ''
        )}
      />
      {errors[field] && <p className='font-sans text-xs font-medium text-red-800'>{errorMessage}</p>}
    </div>
  );
};
