import {typedMemo} from '../../utils'
import {SheetBase} from './Sheet-base.component'

export const Sheet = typedMemo(props => <SheetBase {...props} />)
Sheet.displayName = 'Sheet'
