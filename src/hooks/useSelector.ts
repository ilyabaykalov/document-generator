import { useSelector as useReduxSelector } from 'react-redux'

import { State } from '@interfaces';

export const useSelector = useReduxSelector.withTypes<State>()
