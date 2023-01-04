import { Listbox as ListBox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ListboxProps = {
  label: string,
  options: string[],
  control: Control<FieldValues, any>
  // rules: RegisterOptions;
}

export const Listbox = (props: ListboxProps & UseControllerProps) => {
  const { label, options } = props;
  const { field: { value, onChange }, formState: { errors } } = useController(props);

  return (
    <ListBox value={value} onChange={onChange}>
      <div className="relative">
        <label className='font-sans text-sm font-medium text-gray-500 uppercase'>{label}</label>
        <ListBox.Button className="relative w-full h-10 pl-3 pr-10 text-left bg-white border-2 border-gray-200 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
          <span className="block truncate">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListBox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListBox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options?.map((option) => (
              <ListBox.Option
                key={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListBox.Option>
            ))}
          </ListBox.Options>
        </Transition>
      </div>
    </ListBox>
  )
}
