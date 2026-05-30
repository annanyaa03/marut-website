interface AnimatedNumberProps {
  value: number
  duration?: number
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  return <>{value}</>
}
