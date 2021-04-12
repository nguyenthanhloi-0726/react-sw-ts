import { createSelector } from 'reselect'
import type { RootState } from 'store'

export const loadingSelector = createSelector(
  (state: RootState): boolean => !!state.root.loading,
  loading => loading
)

export default {
  loadingSelector
}
