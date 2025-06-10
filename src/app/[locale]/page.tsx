import { useRoutes } from "@/hooks/use-localized-routes"
import { redirect } from "next/navigation"

export default function Home() {
  const routes = useRoutes()
  redirect(routes.login())
}
