import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/hook/commonTypes'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleLayoutAnimatedTiming} from './Layout-animated-handle'
import {LayoutAnimatedType} from './Layout-animated.enum'
import {UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
        animatedType = LayoutAnimatedType.FADE,
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

        const animatedTiming = useAnimatedTiming({token: theme.token})
        const opacityOutputRanges = [theme.adaptSize(theme.token.spacing.none), opacity]
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRanges)
        }))

        const widthOutputRanges = [
                theme.adaptSize(theme.token.spacing.none),
                width ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseXAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(containerSharedValue.value, [0, 1], widthOutputRanges),
                ...(scale && {transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]})
        }))

        const heightOutputRanges = [
                theme.adaptSize(theme.token.spacing.none),
                height ?? theme.adaptSize(theme.token.spacing.none)
        ]

        const collapseYAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(containerSharedValue.value, [0, 1], heightOutputRanges),
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
                [LayoutAnimatedType.COLLAPSE_X]: collapseXAnimatedStyle,
                [LayoutAnimatedType.COLLAPSE_Y]: collapseYAnimatedStyle,
                [LayoutAnimatedType.FADE]: fadeAnimatedStyle,
                [LayoutAnimatedType.SCALE]: scaleAnimatedStyle,
                [LayoutAnimatedType.STANDARD]: undefined
        } as Record<LayoutAnimatedType, DefaultStyle | undefined>

        useEffect(() => {
                onLayoutAnimatedTiming(visible)
        }, [visible, onLayoutAnimatedTiming])

        return {containerAnimatedStyle: containerAnimated[animatedType]}
}
