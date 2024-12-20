import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {LoadingBaseProps} from './Loading.interface'
import {useLoadingAnimated} from './use-loading-animated.hook'

export const LoadingBase = forwardRef<View, LoadingBaseProps>(({render, height, width, ...renderProps}, ref) => {
        const id = useId()
        const theme = useTheme()
        const {containerAnimatedStyle, rippleAnimatedStyle} = useLoadingAnimated()
        const size = theme.adaptSize(theme.token.spacing.extraSmall * 12)

        return render({
                ...renderProps,
                containerAnimatedStyle,
                height: height ?? size,
                id,
                ref,
                rippleAnimatedStyle,
                theme,
                width: width ?? size
        })
})
