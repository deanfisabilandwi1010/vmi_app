import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { SsoPage } from '@/features/auth/pages/SsoPage'
import { PermissionGuard } from '@/features/auth/components/PermissionGuard'
import { PrivateRoute } from '@/features/auth/components/PrivateRoute'
import { AppShell } from '@/shared/layout/AppShell'
import { LoadingScreen } from '@/shared/components/LoadingScreen'

const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)
const RequestsPage = lazy(() =>
  import('@/features/requests/pages/RequestsPage').then((module) => ({
    default: module.RequestsPage,
  })),
)
const PickupPage = lazy(() =>
  import('@/features/pickup/pages/PickupPage').then((module) => ({
    default: module.PickupPage,
  })),
)
const ShipmentsPage = lazy(() =>
  import('@/features/shipments/pages/ShipmentsPage').then((module) => ({
    default: module.ShipmentsPage,
  })),
)
const TrackingPage = lazy(() =>
  import('@/features/tracking/pages/TrackingPage').then((module) => ({
    default: module.TrackingPage,
  })),
)
const FinancePage = lazy(() =>
  import('@/features/finance/pages/FinancePage').then((module) => ({
    default: module.FinancePage,
  })),
)
const DamagePage = lazy(() =>
  import('@/features/damage/pages/DamagePage').then((module) => ({
    default: module.DamagePage,
  })),
)
const MasterDataPage = lazy(() =>
  import('@/features/master-data/pages/MasterDataPage').then((module) => ({
    default: module.MasterDataPage,
  })),
)
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((module) => ({
    default: module.SettingsPage,
  })),
)

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/sso" element={<SsoPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<AppShell />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/permintaan" element={<RequestsPage />} />
              <Route path="/pengambilan" element={<PickupPage />} />
              <Route path="/pengiriman" element={<ShipmentsPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/finansial" element={<FinancePage />} />
              <Route path="/kerusakan" element={<DamagePage />} />
              <Route
                path="/master-data"
                element={
                  <PermissionGuard permission="master:read">
                    <MasterDataPage />
                  </PermissionGuard>
                }
              />
              <Route
                path="/setting"
                element={
                  <PermissionGuard permission="settings:read">
                    <SettingsPage />
                  </PermissionGuard>
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
