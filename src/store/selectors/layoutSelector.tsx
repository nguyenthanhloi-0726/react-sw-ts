import { createSelector } from 'reselect'
import type { RootState } from 'store'

export const layoutSelector = createSelector(
  (state: RootState) => state.layout,
  layout => layout
)

export default {
  layoutSelector
}
