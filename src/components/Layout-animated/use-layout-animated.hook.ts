import {useEffect, useMemo} from 'react'
import {interpolate, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {HandleLayoutAnimatedTimingOptions, UseLayoutAnimatedOptions} from './Layout-animated.interface'

const handleLayoutAnimatedTiming =
        ({animatedTiming, onAnimatedFinished, entry, exit}: HandleLayoutAnimatedTimingOptions) =>
        (containerSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (typeof visible === 'boolean') {
                        animatedTiming({
                                ...(visible ? entry : exit),
                                callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
                        })(containerSharedValue)(visible ? 1 : 0)
                }
        }

export const useLayoutAnimated = ({
        animatedType = 'fade',
        disabledAnimated,
        entry,
        exit,
        height,
        onAnimatedFinished,
        opacity: rawOpacity,
        visible,
        width
}: UseLayoutAnimatedOptions) => {
        const containerSharedValue = useSharedValue(visible ? 1 : 0)

        const theme = useTheme()
        const opacity = rawOpacity ?? theme.token.opacity.level10
        const animatedTiming = useAnimatedTiming({token: theme.token, disabledAnimated})
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(containerSharedValue.value, [0, 1], [theme.token.opacity.level0, opacity])
        }))

        const widthOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                width ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseXAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(containerSharedValue.value, [0, 1], widthOutputRange)
        }))

        const heightOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                height ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseYAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(containerSharedValue.value, [0, 1], heightOutputRange)
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
                collapseX: collapseXAnimatedStyle,
                collapseY: collapseYAnimatedStyle,
                fade: fadeAnimatedStyle
        }

        useEffect(() => {
                onLayoutAnimatedTiming(visible)
        }, [visible, onLayoutAnimatedTiming])

        return {
                containerAnimatedStyle: containerAnimated[animatedType]
        }
}
