import {forwardRef} from 'react'
import {View} from 'react-native'

import type {PopoverContentProps} from './Popover-content.interface'

import {typedMemo} from '../../../utils'
import {PopoverContentBase} from './Popover-content-base.component'

const PopoverContentWithRef = forwardRef<View, PopoverContentProps>((props, ref) => (
	<PopoverContentBase
		{...props}
		ref={ref}
	/>
))

export const PopoverContent = typedMemo(PopoverContentWithRef)
