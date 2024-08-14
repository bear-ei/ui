import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorBaseProps} from './Progress-active-indicator.interface'
import {useProgressActiveIndicatorAnimated} from './use-progress-active-indicator-animated'

export const ProgressActiveIndicatorBase = forwardRef<View, ProgressActiveIndicatorBaseProps>(
    ({render, defaultValue, value, increment, containerLayout, ...renderProps}, ref) => {
        const id = useId()
        const animatedStyle = useProgressActiveIndicatorAnimated({defaultValue, value, containerLayout, increment})

        return render({...renderProps, id, ref, activeIndicatorAnimatedStyle: animatedStyle})
    }
)
