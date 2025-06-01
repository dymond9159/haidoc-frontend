import { LucideProps } from "lucide-react"

export function FilterIcon(props: LucideProps) {
  return (
    <svg
      width={props?.size || "24"}
      height={props?.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
