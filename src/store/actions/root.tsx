import { LOADING } from 'store/constants'

export const setLoading = (payload: boolean) => ({
  type: LOADING,
  payload
})
