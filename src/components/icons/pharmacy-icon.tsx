import { LucideProps } from "lucide-react"

export function PharmacyIcon(props: LucideProps) {
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
        d="M4.5 16.5C4.5 17.8807 5.61929 19 7 19H17C18.3807 19 19.5 17.8807 19.5 16.5V7.5C19.5 6.11929 18.3807 5 17 5H7C5.61929 5 4.5 6.11929 4.5 7.5V16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
