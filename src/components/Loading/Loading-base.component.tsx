import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {LoadingBaseProps} from './Loading.interface'
import {useLoadingAnimated} from './use-loading-animated.hook'

export const LoadingBase = forwardRef<View, LoadingBaseProps>(({render, ...renderProps}, ref) => {
        const id = useId()
        const theme = useTheme()
        const {contentAnimatedStyle, rippleAnimatedStyle} = useLoadingAnimated()

        return render({
                ...renderProps,
                contentAnimatedStyle,
                id,
                ref,
                rippleAnimatedStyle,
                theme
        })
})
