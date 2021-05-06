import { useCallback } from 'react'
import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit'
import { useAppDispatch } from 'store/hooks'

export const useUnwrapAsyncThunk = () => {
  const dispatch = useAppDispatch()
  return useCallback(
    <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  )
}
