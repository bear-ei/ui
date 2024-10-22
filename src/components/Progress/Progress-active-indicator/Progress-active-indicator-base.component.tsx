import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorBaseProps} from './Progress-active-indicator.interface'
import {useProgressActiveIndicatorAnimated} from './use-progress-active-indicator-animated.hook'

export const ProgressActiveIndicatorBase = forwardRef<
    View,
    ProgressActiveIndicatorBaseProps
>(
    (
        {
            containerLayout,
            defaultValue,
            increment,
            render,
            value,
            ...renderProps
        },
        ref
    ) => {
        const id = useId()
        const {containerAnimatedStyle} = useProgressActiveIndicatorAnimated({
            containerLayout,
            defaultValue,
            increment,
            value
        })

        return render({...renderProps, id, ref, containerAnimatedStyle})
    }
)
