import { Listbox as ListBox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ListboxProps = {
  label: string,
  options: string[],
  control: Control<FieldValues, any>
}

export const Listbox = (props: ListboxProps & UseControllerProps) => {
  const { label, options } = props;
  const { field: { value, onChange } } = useController(props);

  return (
    <ListBox value={value} onChange={onChange}>
      <div className="relative">
        <label className='font-sans text-sm font-medium text-gray-300 uppercase'>{label}</label>
        <ListBox.Button className="mt-2 relative w-full text-left h-10 pl-3 text-[16px] bg-white/5 text-white border border-white/10 rounded cursor-text focus:border-0 focus:outline-none focus-visible:ring focus-visible:ring-white/40">
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
                    active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'
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
