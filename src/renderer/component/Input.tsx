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
      <label className='font-sans text-sm font-medium text-gray-300 uppercase'>{label || field}</label>
      <input
        {...register(field, rules)}
        className={classNames(
          'relative w-full h-10 pl-3 text-[16px] bg-white/5 text-white border border-white/10 rounded cursor-text focus:border-0 focus:outline-none focus-visible:ring focus-visible:ring-white/40',
          extraStyles || ''
        )}
      />
      {errors[field] && <p className='font-sans text-xs font-medium text-red-800'>{errorMessage}</p>}
    </div>
  );
};
