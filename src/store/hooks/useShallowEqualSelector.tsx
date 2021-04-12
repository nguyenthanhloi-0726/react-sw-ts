import { shallowEqual } from 'react-redux'
import { RootState } from 'store'
import useAppSelector from './useAppSelector'

type SelectorFunction = (state: RootState) => any

export default (selector: SelectorFunction) =>
  useAppSelector(selector, shallowEqual)
