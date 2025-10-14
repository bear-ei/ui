import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipBase} from './Tooltip-base.component'
import type {TooltipProps} from './Tooltip.interface'

const TooltipWithRef = forwardRef<View, TooltipProps>((props, ref) => (
        <TooltipBase
                {...props}
                ref={ref}
        />
))

TooltipWithRef.displayName = 'TooltipWithRef'

export const Tooltip = typedMemo(TooltipWithRef)()
