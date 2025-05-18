import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-system-5 bg-system-2 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" className="-ml-4 mb-4" />
            <p className="text-sm text-system-10">
              Fornecendo serviços de saúde de alta qualidade e soluções para pacientes e profissionais de saúde.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/home" className="text-system-11 hover:text-primary-9">
                  Início
                </a>
              </li>
              <li>
                <a href="/about" className="text-system-11 hover:text-primary-9">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/services" className="text-system-11 hover:text-primary-9">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/contact" className="text-system-11 hover:text-primary-9">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="text-system-11 hover:text-primary-9">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-system-11 hover:text-primary-9">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-system-11 hover:text-primary-9">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Contate-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-system-11 hover:text-primary-9">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-system-10">Contate-nos em:</p>
              <p className="text-sm font-medium">support@hai-doc.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-system-5 pt-8 text-center text-sm text-system-10">
          <p>&copy; {new Date().getFullYear()} HaiDoc. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
