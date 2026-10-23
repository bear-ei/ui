import type {PopoverLayoutProps} from './Popover-pressable-layout.interface'

import {typedMemo} from '../../../utils'
import {PopoverPressableLayoutBase} from './Popover-pressable-layout-base.component'

export const PopoverPressableLayout = typedMemo((props: PopoverLayoutProps) => (
	<PopoverPressableLayoutBase {...props} />
))
