import { LucideProps } from "lucide-react"

export function ArrowUpDownIcon(props: LucideProps) {
  const color = props?.color || "currentColor"
  return (
    <svg
      width={props?.size || "25"}
      height={props?.size || "25"}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.49 20.5L8.8457 16.8558L9.88995 15.8115L11.74 17.627V6.3635L9.89945 8.1885L8.8552 7.14425L12.4995 3.5L16.1437 7.14425L15.09 8.2135L13.2397 6.373V17.627L15.09 15.8115L16.134 16.8558L12.49 20.5Z"
        fill={color}
      />
    </svg>
  )
}
