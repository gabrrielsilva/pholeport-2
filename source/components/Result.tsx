import { P } from './typography/P';

type ResultProps = {
  poles_amount: number,
  photos_amount: number,
  poles_without_photos: number,
  timing: number,
}

export const Result = ({ poles_amount, photos_amount, poles_without_photos, timing }: ResultProps) => {
  return (
    <div className='w-screen h-full rounded-lg bg-stone-50'>
      <P text={`Postes: ${poles_amount}`} />
      <P text={`Fotos: ${photos_amount}`} />
      <P text={`Fotos faltantes: ${poles_without_photos}`} />
    </div>
  )
}