import {typedMemo} from '../../utils'
import {LayoutBase} from './Layout-base.component'

export const Layout = typedMemo(props => <LayoutBase {...props} />)

