import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleLayoutAnimatedTiming} from './Layout-animated-handle'
import {UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
        animatedType = 'fade',
        disabledAnimated,
        entry,
        exit,
        height,
        onAnimatedFinished,
        opacity: rawOpacity,
        scale,
        status,
        visible,
        width
}: UseLayoutAnimatedOptions) => {
        const containerSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const opacity = useMemo(
                () => rawOpacity ?? theme.token.opacity.level10,
                [rawOpacity, theme.token.opacity.level10]
        )

        const animatedTiming = useAnimatedTiming({token: theme.token, disabledAnimated})
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(containerSharedValue.value, [0, 1], [theme.token.opacity.level0, opacity])
        }))

        const widthOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                width ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseXAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(containerSharedValue.value, [0, 1], widthOutputRange),
                ...(scale && {
                        transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                })
        }))

        const heightOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                height ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseYAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(containerSharedValue.value, [0, 1], heightOutputRange),
                ...(scale && {
                        transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                })
        }))

        const scaleAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
        }))

        const onLayoutAnimatedTiming = useMemo(
                () =>
                        handleLayoutAnimatedTiming({
                                animatedTiming,
                                entry,
                                exit,
                                onAnimatedFinished
                        })(containerSharedValue),
                [animatedTiming, containerSharedValue, entry, exit, onAnimatedFinished]
        )

        const containerAnimated = {
                collapseX: typeof width === 'number' ? collapseXAnimatedStyle : undefined,
                collapseY: typeof height === 'number' ? collapseYAnimatedStyle : undefined,
                fade: fadeAnimatedStyle,
                scale: scaleAnimatedStyle
        }

        useEffect(() => {
                if (status === 'succeeded') {
                        onLayoutAnimatedTiming(visible)
                }
        }, [visible, onLayoutAnimatedTiming, status])

        return {containerAnimatedStyle: containerAnimated[animatedType]}
}
