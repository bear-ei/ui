import {useInteractionStateEvent} from '@/hooks'
import React, {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {MaskBaseProps} from './Mask.interface'
import {RenderMask} from './Mask.render'

export const MaskBase = forwardRef<View, MaskBaseProps>((props, ref) => {
        const id = useId()
        const interactionHandlers = useInteractionStateEvent(props)

        return (
                <RenderMask
                        {...props}
                        id={id}
                        interactionHandlers={interactionHandlers}
                        ref={ref}
                />
        )
})

MaskBase.displayName = 'MaskBase'
