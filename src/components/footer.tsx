import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  const t = useTranslations("landing.footer")
  const tCommon = useTranslations("common")
  return (
    <footer className="border-t border-system-5 bg-system-2 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" className="-ml-4 mb-4" />
            <p className="text-sm text-system-10">{t("description")}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">{tCommon("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home" className="text-system-11 hover:text-primary-9">
                  {tCommon("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-system-11 hover:text-primary-9">
                  {tCommon("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-system-11 hover:text-primary-9">
                  {tCommon("services")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-system-11 hover:text-primary-9">
                  {tCommon("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">{tCommon("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-system-11 hover:text-primary-9">
                  {tCommon("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-system-11 hover:text-primary-9">
                  {tCommon("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-system-11 hover:text-primary-9">
                  {tCommon("cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">{tCommon("contactUs")}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-system-10">{tCommon("contactUsAt")}</p>
              <p className="text-sm font-medium">support@hai-doc.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-system-5 pt-8 text-center text-sm text-system-10">
          <p>
            &copy; {new Date().getFullYear()} HaiDoc. {tCommon("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
