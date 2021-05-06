import {
  createAsyncThunk,
  createSlice,
  AnyAction,
  AsyncThunk
} from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import { RootState } from 'store'
import { setLoading } from 'store/actions/root'
import { IDLE, LOADING, SUCCEEDED, FAILED } from 'store/constants'
import { cloneDeep } from 'utils/lodash'
import fakeAPI from 'api/fakeAPI'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

type TData = {
  currentRequestId: string | undefined
  status: string
  data: unknown
}

type TInitialState = {
  [key: string]: TData
}

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

const initialState: TInitialState = {}

export const baseAPIState: TData = {
  currentRequestId: undefined,
  status: IDLE,
  data: undefined
}

function isPendingAPIAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('api/') && action.type.endsWith('/pending')
}

function isRejectedAPIAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('api/') && action.type.endsWith('/rejected')
}

function isFulfilledAPIAction(action: AnyAction): action is FulfilledAction {
  return action.type.startsWith('api/') && action.type.endsWith('/fulfilled')
}

const api = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      const { name, status } = action.payload
      state[name] && (state[name].status = status)
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isPendingAPIAction, (state, action) => {
      const key = action.type.replace(/api\/(.+)\/pending/, '$1')

      if (!(key in state)) {
        state[key] = cloneDeep(baseAPIState)
      }

      if (state[key].status === IDLE || state[key].status === FAILED) {
        state[key].status = LOADING
        state[key].currentRequestId = action.meta.requestId
      }
    })

    builder.addMatcher(isFulfilledAPIAction, (state, action) => {
      const key = action.type.replace(/api\/(.+)\/fulfilled/, '$1')

      state[key].status = SUCCEEDED
      state[key].currentRequestId = undefined
      state[key].data = action.payload
    })

    builder.addMatcher(isRejectedAPIAction, (state, action) => {
      const key = action.type.replace(/api\/(.+)\/rejected/, '$1')

      if (
        state[key].status === LOADING &&
        state[key].currentRequestId === action.meta.requestId
      ) {
        state[key].status = FAILED
        state[key].currentRequestId = undefined
      }
    })
  }
})

function createBaseAsyncThunk<Returned = any, Arg = undefined>(
  action: () => Promise<AxiosResponse<any>>,
  key: string
) {
  return createAsyncThunk<
    Returned,
    Arg,
    {
      state: RootState
      rejectValue: ValidationErrors
    }
  >(
    `api/${key}`,
    async (_, { dispatch, getState, requestId, rejectWithValue }) => {
      try {
        dispatch(setLoading(true))
        const { status, currentRequestId, data: preData } = getState().api[key]

        if (status !== LOADING || requestId !== currentRequestId) {
          return preData
        }
        const { data } = await action()

        return data
      } catch (err) {
        let error: AxiosError<ValidationErrors> = err

        if (!error.response) {
          throw err
        }

        return rejectWithValue(error.response.data)
      } finally {
        dispatch(setLoading(false))
      }
    }
  )
}

export const { setStatus } = api.actions

export const getUsers = createBaseAsyncThunk(fakeAPI.getUsers, 'users')
export const getTodo = createBaseAsyncThunk(fakeAPI.getTodo, 'todo')
export const getPosts = createBaseAsyncThunk(fakeAPI.getPosts, 'posts')

export default api.reducer
