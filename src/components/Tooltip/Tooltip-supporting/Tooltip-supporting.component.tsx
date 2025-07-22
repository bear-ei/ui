import {forwardRef} from 'react'
import {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {TooltipSupportingBase} from './Tooltip-supporting-base.component'
import type {TooltipSupportingProps} from './Tooltip-supporting.interface'

const TooltipSupportingWithRef = forwardRef<View, TooltipSupportingProps>((props, ref) => (
	<TooltipSupportingBase
		{...props}
		ref={ref}
	/>
))

export const TooltipSupporting = typedMemo(TooltipSupportingWithRef)()
