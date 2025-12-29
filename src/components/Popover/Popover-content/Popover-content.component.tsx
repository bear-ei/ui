import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {PopoverContentBase} from './Popover-content-base.component'
import type {PopoverContentProps} from './Popover-content.interface'

const PopoverContentWithRef = forwardRef<View, PopoverContentProps>((props, ref) => (
        <PopoverContentBase
                {...props}
                ref={ref}
        />
))

PopoverContentWithRef.displayName = 'PopoverContentWithRef'

export const PopoverContent = typedMemo(PopoverContentWithRef)()
