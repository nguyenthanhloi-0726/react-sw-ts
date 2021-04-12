import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TLayout } from 'routes'

const initialState: TLayout = {
  header: false,
  sidebar: false,
  footer: false
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateLayoutConfig: (_, action: PayloadAction<TLayout>) => {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateLayoutConfig } = layoutSlice.actions

export default layoutSlice.reducer
