import {typedMemo} from '../../utils'
import {FABBase} from './FAB-base.component'

export const Fab = typedMemo(props => <FABBase {...props} />)
