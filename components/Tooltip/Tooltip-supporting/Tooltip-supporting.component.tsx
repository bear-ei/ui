import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipSupportingBase} from './Tooltip-supporting-base.component'
import type {TooltipSupportingProps} from './Tooltip-supporting.interface'

const TooltipSupportingWithRef = forwardRef<View, TooltipSupportingProps>((props, ref) => (
        <TooltipSupportingBase
                {...props}
                ref={ref}
        />
))

TooltipSupportingWithRef.displayName = 'TooltipSupportingWithRef'

export const TooltipSupporting = typedMemo(TooltipSupportingWithRef)()
