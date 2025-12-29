import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {PopoverBase} from './Popover-base.component'
import type {PopoverProps} from './Popover.interface'

const PopoverWithRef = forwardRef<View, PopoverProps>((props, ref) => (
        <PopoverBase
                {...props}
                ref={ref}
        />
))

PopoverWithRef.displayName = 'PopoverWithRef'

export const Popover = typedMemo(PopoverWithRef)()
