import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {ProgressActiveIndicatorCircularBaseProps} from './Progress-active-indicator-circular.interface'
import {useProgressActiveIndicatorCircularAnimated} from './use-progress-active-indicator-circular-animated.hook'

export const ProgressActiveIndicatorCircularBase = forwardRef<View, ProgressActiveIndicatorCircularBaseProps>(
        ({render, ...renderProps}, ref) => {
                const id = useId()
                const theme = useTheme()
                const {iconAnimatedStyle} = useProgressActiveIndicatorCircularAnimated()

                return render({
                        ...renderProps,
                        iconAnimatedStyle,
                        id,
                        ref,
                        theme
                })
        }
)
