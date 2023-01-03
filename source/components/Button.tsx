import { classNames } from '../util/classNames'

type ButtonProps = {
  type: "button" | "submit" | "reset",
  text: string,
  extraStyles: string
  onClick?: () => void,
}

export const Button = ({ type, text, onClick, extraStyles }: ButtonProps) => {
  return <button type={type} onClick={onClick} className={classNames('h-12 rounded font-sans font-bold text-lg', extraStyles)}>{text}</button>
}