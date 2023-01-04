import { classNames } from '../../util/classNames'

type PProps = {
  text: string,
  extraStyles?: string
}

export const P = ({ text, extraStyles }: PProps) => {
  return <p className={classNames('font-sans text-lg text-stone-700', extraStyles || '')}>{text}</p>
}