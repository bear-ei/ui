import {forwardRef} from 'react'
import {PopoverPressableLayoutBase} from './Popover-pressable-layout-base.component'
import type {PopoverLayoutProps} from './Popover-pressable-layout.interface'
import type {PressableType} from '../../Touchable'
import {typedMemo} from '../../../utils'

const PopoverPressableLayoutWithRef = forwardRef<PressableType, PopoverLayoutProps>((props, ref) => (
	<PopoverPressableLayoutBase
		{...props}
		ref={ref}
	/>
))

PopoverPressableLayoutWithRef.displayName = 'PopoverPressableLayoutWithRef'

export const PopoverPressableLayout = typedMemo(PopoverPressableLayoutWithRef)()
