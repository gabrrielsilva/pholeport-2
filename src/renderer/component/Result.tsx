type ResultProps = {
  poles_amount: number,
  photos_amount: number,
  poles_without_photos: number,
  timing: number,
}

export const Result = ({ poles_amount, photos_amount, poles_without_photos, timing }: ResultProps) => {
  return (
    <div className='flex-grow w-full h-full mt-2 min-w-max'>
      <div className='w-full'>
        <p className='font-sans text-lg font-medium text-gray-300'>Gerado em: <span className='font-bold text-blue-300'>{timing + 's'}</span></p>
        <p className='font-sans text-lg font-medium text-gray-300'>Postes: <span className='font-bold text-blue-300'>{poles_amount}</span></p>
        <p className='font-sans text-lg font-medium text-gray-300'>Fotos: <span className='font-bold text-blue-300'>{photos_amount}</span></p>
        <p className='font-sans text-lg font-medium text-gray-300'>Fotos faltantes: <span className='font-bold text-blue-300'>{poles_without_photos}</span></p>
      </div>
      <div className='mt-4'>
        <h2 className='text-xl font-sans font-semibold text-[#f35576]'>O PDF comprimido aparecerá em instantes 🐢</h2>
      </div>
    </div>
  )
}