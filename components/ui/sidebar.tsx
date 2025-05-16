'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

const topLinks = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Campaigns", href: "/campaigns", icon: "📈" },
  { name: "Landing Page", href: "/landing", icon: "🎨" },
  { name: "Email Templates", href: "/templates", icon: "✉️" },
]

const bottomLinks = [
  { name: "Account", href: "/account", icon: "👤" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mappingOpen, setMappingOpen] = useState(false)

  return (
    <aside className="w-56 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Echo</div>

        <nav className="space-y-1">
          {topLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors",
                pathname === link.href && "bg-gray-100 font-medium text-black"
              )}
            >
              <span className="mr-1.5">{link.icon}</span> {link.name}
            </Link>
          ))}

          <div>
            <button
              onClick={() => setMappingOpen(!mappingOpen)}
              className="w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="mr-1.5">🧩</span> Mapping {mappingOpen ? "▾" : "▸"}
            </button>
            {mappingOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  href="/mapping"
                  className={cn(
                    "block text-sm text-gray-700 hover:underline",
                    pathname === "/mapping" && "font-medium text-black"
                  )}
                >
                  Overview
                </Link>
                <Link
                  href="/mapping/features"
                  className={cn(
                    "block text-sm text-gray-700 hover:underline",
                    pathname === "/mapping/features" && "font-medium text-black"
                  )}
                >
                  Features
                </Link>
                <Link
                  href="/mapping/buyer-signals"
                  className={cn(
                    "block text-sm text-gray-700 hover:underline",
                    pathname === "/mapping/buyer-signals" && "font-medium text-black"
                  )}
                >
                  Buyer Signals
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 pt-2 space-y-1 border-t border-gray-200">
        {bottomLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "block px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors",
              pathname === link.href && "bg-gray-100 font-medium text-black"
            )}
          >
            <span className="mr-1.5">{link.icon}</span> {link.name}
          </Link>
        ))}
      </div>
    </aside>
  )
}
