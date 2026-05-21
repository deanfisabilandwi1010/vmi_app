import {
  AlertTriangle,
  BarChart3,
  Boxes,
  ClipboardCheck,
  FileText,
  Menu,
  PackageCheck,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  WalletCards,
} from 'lucide-react'
import { memo, useCallback } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logout } from '@/features/auth/authSlice'
import { setGlobalSearch, toggleSidebar } from '@/features/ui/uiSlice'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/lib/cn'

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { label: 'Permintaan Material', path: '/permintaan', icon: FileText },
  { label: 'Pengambilan Material', path: '/pengambilan', icon: ClipboardCheck },
  { label: 'Pengiriman Material', path: '/pengiriman', icon: Truck },
  { label: 'Tracking Pengiriman', path: '/tracking', icon: Route },
  { label: 'Finansial', path: '/finansial', icon: WalletCards },
  { label: 'Laporan Kerusakan', path: '/kerusakan', icon: AlertTriangle },
  { label: 'Master Data', path: '/master-data', icon: Boxes },
  { label: 'Setting', path: '/setting', icon: Settings },
]

export const AppShell = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  const search = useAppSelector((state) => state.ui.search)

  const handleLogout = useCallback(() => {
    dispatch(logout())
    navigate('/login')
  }, [dispatch, navigate])

  return (
    <div className="min-h-screen bg-pln-canvas">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-pln-line bg-pln-blue text-white transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-sm font-black text-pln-blue">
            VMI
          </div>
          <div>
            <p className="text-base font-black">PLN Nusa Daya</p>
            <p className="text-xs text-blue-100">Vendor Managed Inventory</p>
          </div>
        </div>
        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'focus-ring flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-blue-50 transition',
                    isActive
                      ? 'bg-white text-pln-blue shadow-sm'
                      : 'hover:bg-white/10',
                  )
                }
                key={item.path}
                to={item.path}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="mt-1 text-xs text-blue-100">{user?.unit}</p>
          </div>
          <Button className="mt-3 w-full" onClick={handleLogout} variant="secondary">
            Keluar
          </Button>
        </div>
      </aside>

      <div className="transition-all duration-300 lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-pln-line bg-white/92 backdrop-blur">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6">
            <button
              aria-label="Buka menu"
              className="focus-ring rounded-lg border border-pln-line p-2 text-pln-ink"
              onClick={() => dispatch(toggleSidebar())}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pln-muted" />
              <input
                className="focus-ring h-11 w-full rounded-lg border border-pln-line bg-pln-canvas pl-10 pr-4 text-sm outline-none"
                onChange={(event) =>
                  dispatch(setGlobalSearch(event.target.value))
                }
                placeholder="Cari order, unit, pengiriman, atau dokumen"
                value={search}
              />
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 md:flex">
              <ShieldCheck className="h-4 w-4" />
              API Ready
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-pln-blue md:flex">
              <PackageCheck className="h-4 w-4" />
              KWH Meter
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
})

AppShell.displayName = 'AppShell'
