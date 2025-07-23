import {forwardRef} from 'react'
import {View} from 'react-native'
import {typedMemo} from '../../utils'
import {TooltipBase} from './Tooltip-base.component'
import type {TooltipProps} from './Tooltip.interface'

const TooltipWithRef = forwardRef<View, TooltipProps>((props, ref) => (
	<TooltipBase
		{...props}
		ref={ref}
	/>
))

export const Tooltip = typedMemo(TooltipWithRef)()
