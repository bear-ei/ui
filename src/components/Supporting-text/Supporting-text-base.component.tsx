import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {SupportingTextBaseProps} from './Supporting-text.interface'
import {RenderSupportingText} from './Supporting-text.render'
import {useSupportingTextAnimated} from './use-supporting-text-animated.hook'

export const SupportingTextBase = forwardRef<View, SupportingTextBaseProps>(({error, disabled, ...props}, ref) => {
        const id = useId()
        const {textAnimatedStyle} = useSupportingTextAnimated({error, disabled})

        return (
                <RenderSupportingText
                        {...props}
                        id={id}
                        ref={ref}
                        textAnimatedStyle={textAnimatedStyle}
                />
        )
})

SupportingTextBase.displayName = 'SupportingTextBase'
