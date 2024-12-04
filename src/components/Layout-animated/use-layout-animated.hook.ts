import {useEffect, useMemo} from 'react'
import {AnimatableValue, interpolate, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {debounce} from '../../utils'
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
                const animated = {
                        collapse: widthSharedValue,
                        fade: opacitySharedValue
                } as Record<LayoutAnimatedType, SharedValue<AnimatableValue>>

                if (typeof visible === 'boolean') {
                        animatedTiming({
                                ...(visible ? entry : exit),
                                callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
                        })(animated[animatedType])(visible ? 1 : 0)
                }
        }

export const useLayoutAnimated = ({
        animatedType = 'fade',
        entry,
        exit,
        onAnimatedFinished,
        opacity = 1,
        visible,
        width
}: UseLayoutAnimatedOptions) => {
        const opacitySharedValue = useSharedValue(visible ? 1 : 0)
        const widthSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming(theme.token)
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(opacitySharedValue.value, [0, 1], [0, opacity])
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
                        debounce(
                                handleLayoutAnimatedTiming({
                                        animatedTiming,
                                        animatedType,
                                        entry,
                                        exit,
                                        onAnimatedFinished
                                })({
                                        opacitySharedValue,
                                        widthSharedValue
                                })
                        )(50),
                [animatedTiming, animatedType, entry, exit, onAnimatedFinished, opacitySharedValue, widthSharedValue]
        )

        useEffect(() => {
                onLayoutAnimatedTiming(visible)
        }, [visible, onLayoutAnimatedTiming])

        return {fadeAnimatedStyle, collapseAnimatedStyle}
}
