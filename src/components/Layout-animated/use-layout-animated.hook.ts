import {useEffect, useMemo} from 'react'
import {interpolate, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {
        HandleLayoutAnimatedTimingOptions,
        HandleLayoutAnimatedTimingSharedValue,
        LayoutAnimatedType,
        UseLayoutAnimatedOptions
} from './Layout-animated.interface'

const handleLayoutAnimatedTiming =
        ({animatedTiming, onAnimatedFinished, entry, exit, animatedType = 'fade'}: HandleLayoutAnimatedTimingOptions) =>
        ({opacitySharedValue, widthSharedValue}: HandleLayoutAnimatedTimingSharedValue) =>
        (visible?: boolean) => {
                const animated = {collapse: widthSharedValue, fade: opacitySharedValue} as Record<
                        LayoutAnimatedType,
                        SharedValue<number>
                >

                if (typeof visible === 'boolean') {
                        animatedTiming({
                                ...(visible ? entry : exit),
                                callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
                        })(animated[animatedType])(visible ? 1 : 0)
                }
        }

export const useLayoutAnimated = ({
        animatedType = 'fade',
        disabledAnimated,
        entry,
        exit,
        onAnimatedFinished,
        opacity: rawOpacity,
        visible,
        width
}: UseLayoutAnimatedOptions) => {
        const opacitySharedValue = useSharedValue(visible ? 1 : 0)
        const widthSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const opacity = rawOpacity ?? theme.token.opacity.level10
        const animatedTiming = useAnimatedTiming({token: theme.token, disabledAnimated})
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(opacitySharedValue.value, [0, 1], [theme.token.opacity.level0, opacity])
        }))

        const widthOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                width ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(widthSharedValue.value, [0, 1], widthOutputRange)
        }))

        const onLayoutAnimatedTiming = useMemo(
                () =>
                        handleLayoutAnimatedTiming({
                                animatedTiming,
                                animatedType,
                                entry,
                                exit,
                                onAnimatedFinished
                        })({
                                opacitySharedValue,
                                widthSharedValue
                        }),
                [animatedTiming, animatedType, entry, exit, onAnimatedFinished, opacitySharedValue, widthSharedValue]
        )

        useEffect(() => {
                onLayoutAnimatedTiming(visible)
        }, [visible, onLayoutAnimatedTiming])

        return {fadeAnimatedStyle, collapseAnimatedStyle}
}
