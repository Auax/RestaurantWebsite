import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 text-stone-700">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">Dolce Vita Ristorante</h3>
            <p className="text-sm">El auténtico sabor de Italia, cerca de ti.</p>
            <p className="text-sm mt-2">Carrer de Montcada 42, 08003 Barcelona, España</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/menu" className="hover:text-red-400">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-red-400">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-red-400">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-400">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-stone-600 hover:text-red-400">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-stone-600 hover:text-red-400">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-stone-600 hover:text-red-400">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-300 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Dolce Vita Ristorante. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
