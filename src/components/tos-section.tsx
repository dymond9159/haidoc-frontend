import { ReactNode } from "react"

interface TOSSectionProps {
  title: string
  children: ReactNode
}

export default function TOSSection({ title, children }: TOSSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{title}</h2>
      {children}
    </section>
  )
}
