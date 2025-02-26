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
        const opacityOutputRange = [
                animatedType === 'standard' ? 1 : theme.adaptSize(theme.token.spacing.none),
                opacity
        ]

        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRange)
        }))

        const widthOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                width ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseXAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(containerSharedValue.value, [0, 1], widthOutputRange),
                ...(scale && {transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]})
        }))

        const heightOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                height ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseYAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(containerSharedValue.value, [0, 1], heightOutputRange),
                ...(scale && {transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]})
        }))

        const scaleAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
        }))

        const onLayoutAnimatedTiming = useMemo(
                () =>
                        handleLayoutAnimatedTiming({animatedTiming, entry, exit, onAnimatedFinished})(
                                containerSharedValue
                        ),
                [animatedTiming, containerSharedValue, entry, exit, onAnimatedFinished]
        )

        const containerAnimated = {
                collapseX: collapseXAnimatedStyle,
                collapseY: collapseYAnimatedStyle,
                fade: fadeAnimatedStyle,
                scale: scaleAnimatedStyle,
                standard: fadeAnimatedStyle
        }

        useEffect(() => {
                onLayoutAnimatedTiming(visible)
        }, [disabledAnimated, visible, onLayoutAnimatedTiming])

        return {containerAnimatedStyle: containerAnimated[animatedType]}
}
