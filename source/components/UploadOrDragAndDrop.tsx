import { FieldValues, UseFormRegister } from 'react-hook-form'

type UploadOrDragAndDropProps = {
  register: UseFormRegister<FieldValues>,
}

export const UploadOrDragAndDrop = ({ register }: UploadOrDragAndDropProps) => {
  return (
    <div className="flex items-center justify-center w-full col-span-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-stone-300 border-dashed rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100">
        <div className="flex flex-col items-center justify-center py-5">
          <svg aria-hidden="true" className="w-10 h-10 mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <p className="mb-2 text-sm text-stone-500 dark:text-stone-400"><span className="font-semibold">Clique para carregar</span> ou arraste e solte</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">KMZ</p>
        </div>
        <input id="dropzone-file" type="file" {...register('kmz')} accept=".kmz" className="hidden" />
      </label>
    </div>
  )
}