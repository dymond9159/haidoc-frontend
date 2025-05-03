import { Icon } from "@/components/icons/icons"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-system-5 bg-system-2 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-system-10">
              Providing quality healthcare services and solutions for patients
              and healthcare providers.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-system-11 hover:text-primary-9">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Twitter</span>
                <Icon name="message-square" className="h-5 w-5" />
              </a>
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Facebook</span>
                <Icon name="heart" className="h-5 w-5" />
              </a>
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Instagram</span>
                <Icon name="info" className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-system-10">Contact us at:</p>
              <p className="text-sm font-medium">support@haidoc.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-system-5 pt-8 text-center text-sm text-system-10">
          <p>&copy; {new Date().getFullYear()} HaiDoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
