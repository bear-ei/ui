import type {PressableType} from '@/components/Touchable'
import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {PopoverPressableLayoutBase} from './Popover-pressable-layout-base.component'
import type {PopoverLayoutProps} from './Popover-pressable-layout.interface'

const PopoverPressableLayoutWithRef = forwardRef<PressableType, PopoverLayoutProps>((props, ref) => (
    <PopoverPressableLayoutBase
        {...props}
        ref={ref}
    />
))

PopoverPressableLayoutWithRef.displayName = 'PopoverPressableLayoutWithRef'

export const PopoverPressableLayout = typedMemo(PopoverPressableLayoutWithRef)()
