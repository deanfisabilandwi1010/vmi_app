import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'super-admin' | 'pln-pusat' | 'logistik' | 'up3' | 'kurir'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: UserRole
  unit: string
  permissions: string[]
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  rememberedEmail: string | null
}

const demoUser: AuthUser = {
  id: 'USR-001',
  name: 'Admin Logistik PLN Nusa Daya',
  email: 'admin@plnnusadaya.co.id',
  role: 'super-admin',
  unit: 'Gudang Makassar',
  permissions: ['request:approve', 'master:read', 'settings:read'],
}

const initialState: AuthState = {
  user: demoUser,
  token: 'demo-session-token',
  rememberedEmail: 'admin@plnnusadaya.co.id',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; remember: boolean }>,
    ) => {
      state.user = { ...demoUser, email: action.payload.email }
      state.token = 'demo-session-token'
      state.rememberedEmail = action.payload.remember
        ? action.payload.email
        : null
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
