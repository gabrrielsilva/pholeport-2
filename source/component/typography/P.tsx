import { class_names } from '../../util/class-names'

type PProps = {
  text: string,
  extraStyles?: string
}

export const P = ({ text, extraStyles }: PProps) => {
  return <p className={class_names('font-sans text-lg text-stone-700', extraStyles || '')}>{text}</p>
}