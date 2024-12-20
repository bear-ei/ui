import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorLinearBaseProps} from './Progress-active-indicator-linear.interface'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase = forwardRef<View, ProgressActiveIndicatorLinearBaseProps>(
        ({containerLayout, defaultValue, increment, render, value, ...renderProps}, ref) => {
                const id = useId()
                const {containerAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({
                        containerLayout,
                        defaultValue,
                        increment,
                        value
                })

                return render({...renderProps, id, ref, containerAnimatedStyle})
        }
)
