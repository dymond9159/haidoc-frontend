import { LucideProps } from "lucide-react"

export function ArrowLeftIcon(props: LucideProps) {
  const color = props?.color || "currentColor"
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.373 8.75L9.06925 14.4462L8 15.5L0.5 8L8 0.5L9.06925 1.55375L3.373 7.25H15.5V8.75H3.373Z"
        fill={color}
      />
    </svg>
  )
}
