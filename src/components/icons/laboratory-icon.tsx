import { LucideProps } from "lucide-react"

export function LaboratoryIcon(props: LucideProps) {
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
        d="M9 3H15M10 3V9.34C10 9.98 9.64 10.56 9.12 10.88L4.88 13.12C4.36 13.44 4 14.02 4 14.66V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V14.66C20 14.02 19.64 13.44 19.12 13.12L14.88 10.88C14.36 10.56 14 9.98 14 9.34V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
