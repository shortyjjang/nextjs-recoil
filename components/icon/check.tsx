
type CheckProps = {
    size?: number;
    color: string;
}

export default function CheckIcon({size, color}:CheckProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size? size: '100%'} viewBox="0 96 960 960" width={size? size: '100%'}><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" fill={color}/></svg>
  )
}
