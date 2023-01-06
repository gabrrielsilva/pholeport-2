import { class_names } from '../../util/class-names'

type H1Props = {
  text: string,
  extraStyles: string
}

export const H1 = ({ text, extraStyles }: H1Props) => {
  return <h1 className={class_names('text-4xl font-bold font-sans', extraStyles)}>{text}</h1>
}