import { FieldValues, UseFormRegister } from 'react-hook-form';
import { classNames } from '../util/classNames';

type InputProps = {
  type: React.HTMLInputTypeAttribute,
  register: UseFormRegister<FieldValues>,
  field: string;
  label?: string;
  extraStyles?: string
  accept?: string;
}

export const Input = ({ type, register, field, label, accept, extraStyles }: InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='uppercase font-sans font-medium text-sm text-gray-500'>{label || field}</label>
      <input type={type} {...register(field)} accept={accept} className={classNames('border rounded text-lg h-10 px-2 w-full focus:outline-none focus:ring focus:ring-offset-1 focus:ring-offset-transparent focus:ring-gray-200 transition-colors duration-200', extraStyles || '')} />
    </div>
  )
}