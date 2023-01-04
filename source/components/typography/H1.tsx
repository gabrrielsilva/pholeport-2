import { classNames } from '../../util/classNames'

type H1Props = {
  text: string,
  extraStyles: string
}

export const H1 = ({ text, extraStyles }: H1Props) => {
  return <h1 className={classNames('text-4xl font-bold font-sans', extraStyles)}>{text}</h1>
}