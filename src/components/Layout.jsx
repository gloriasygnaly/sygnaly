import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import sygnalyLogo from '../assets/logo-sygnaly-blanco2.png'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* ── Mobile top bar (fixed, only visible below md) ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4"
        style={{ background: '#0F2744', height: 56 }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white/80 hover:text-white p-1 -ml-1"
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>
        <img src={sygnalyLogo} alt="Sygnaly" style={{ height: 26 }} />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main content ──
          pt-14 on mobile to clear the fixed 56px top bar.
          On desktop (md+) no top bar → no extra padding. */}
      <main className="flex-1 overflow-y-auto min-w-0 pt-14 md:pt-0 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <footer className="py-4 text-center" style={{ fontSize: 11, color: '#9CA3AF' }}>
          Sygnaly © 2026 · Gloria Maturana
        </footer>
      </main>
    </>
  )
}
