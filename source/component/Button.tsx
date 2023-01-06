import { class_names } from '../util/class-names'

type ButtonProps = {
  type: "button" | "submit" | "reset",
  text: string,
  extraStyles: string
  onClick?: () => void,
}

export const Button = ({ type, text, onClick, extraStyles }: ButtonProps) => {
  return <button type={type} onClick={onClick} className={class_names('h-12 rounded font-sans font-bold text-lg', extraStyles)}>{text}</button>
}