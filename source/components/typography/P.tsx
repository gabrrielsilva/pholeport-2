import { classNames } from '../../util/classNames'

type PProps = {
  text: string,
  extraStyles: string
}

export const P = ({ text, extraStyles }: PProps) => {
  return <p className={classNames('font-sans text-lg', extraStyles)}>{text}</p>
}