
type ResultProps = {
  poles_amount: number,
  photos_amount: number,
  poles_without_photos: number,
  timing: number,
}

export const Result = ({ poles_amount, photos_amount, poles_without_photos, timing }: ResultProps) => {
  return (
    <div className='w-screen h-full rounded-lg bg-stone-50'>
      <p className='font-sans text-lg font-bold text-[#3992ff]'>Gerado em: <span className='font-normal text-gray-600'>{timing + 's'}</span></p>
      <p className='font-sans text-lg font-bold text-[#3992ff]'>Postes: <span className='font-normal text-gray-600'>{poles_amount}</span></p>
      <p className='font-sans text-lg font-bold text-[#3992ff]'>Fotos: <span className='font-normal text-gray-600'>{photos_amount}</span></p>
      <p className='font-sans text-lg font-bold text-[#3992ff]'>Fotos faltantes: <span className='font-normal text-gray-600'>{poles_without_photos}</span></p>
    </div>
  )
}