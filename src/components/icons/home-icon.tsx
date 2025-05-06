import { LucideProps } from "lucide-react"

export function HomeIcon(props: LucideProps) {
  const color = props?.color || "currentColor"
  return (
    <svg
      width={props?.size || "16"}
      height={props?.size || "18"}
      viewBox="0 0 16 18"
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 16H5.34625V10.0577H10.6538V16H14V6.99996L8 2.48071L2 6.99996V16ZM0.5 17.5V6.24996L8 0.605713L15.5 6.24996V17.5H9.15375V11.5577H6.84625V17.5H0.5Z"
        fill={color}
      />
    </svg>
  )
}
