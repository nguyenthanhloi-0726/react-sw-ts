import { createSelector } from 'reselect'
import type { RootState } from 'store'
import { ensureObject } from 'utils/helpers'

export const usersSelector = createSelector(
  (state: RootState) => state.api,
  api => ensureObject(api.users)
)

export default {
  usersSelector
}
