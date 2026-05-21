import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UiState = {
  sidebarOpen: boolean
  search: string
}

const initialState: UiState = {
  sidebarOpen: false,
  search: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setGlobalSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setGlobalSearch, setSidebarOpen, toggleSidebar } =
  uiSlice.actions
export default uiSlice.reducer
