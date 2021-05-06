import { combineReducers } from 'redux'
import { PayloadAction } from '@reduxjs/toolkit'
import apiSlice from 'store/slices/apiSlice'
import { LOADING } from 'store/constants'
import layoutSlice from 'store/slices/layoutSlice'

const initialState = {
  loading: 0 // 0 = hide loading
}

const root = (state = initialState, action: PayloadAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: state.loading + (payload ? 1 : -1)
      }
    default:
      return state
  }
}

export default combineReducers({
  root: root,
  layout: layoutSlice,
  api: apiSlice
})
