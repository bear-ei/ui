import type {PressableType} from '@/components/Touchable'
import {forwardRef, useId} from 'react'
import type {PopoverLayoutBaseProps} from './Popover-pressable-layout.interface'
import {RenderPopoverPressableLayout} from './Popover-pressable-layout.render'

export const PopoverPressableLayoutBase = forwardRef<PressableType, PopoverLayoutBaseProps>((props, ref) => {
        const id = useId()

        return (
                <RenderPopoverPressableLayout
                        {...props}
                        id={id}
                        ref={ref}
                />
        )
})

PopoverPressableLayoutBase.displayName = 'PopoverPressableLayoutBase'
