import {typedMemo} from '../../../utils'
import {SheetContentBase} from './Sheet-content-base.component'

export const SheetContent = typedMemo(props => <SheetContentBase {...props} />)
