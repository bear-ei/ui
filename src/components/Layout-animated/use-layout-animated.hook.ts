import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {debounce, platformValue} from '@/utils'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'
import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
        animatedType = LAYOUT_ANIMATED.FADE,
        delay = 50,
        entry,
        exit,
        height = 0,
        onAnimationFinished,
        opacity: rawOpacity,
        scale,
        status,
        translate,
        visible,
        width = 0
}: UseLayoutAnimatedOptions) => {
        const containerSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const opacity = rawOpacity ?? theme.token.opacity.level10
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const createEntrySharedValueAnimator = useMemo(
                () =>
                        animatedTiming({
                                ...entry,
                                callback: (finished?: boolean) => finished && onAnimationFinished?.(true)
                        }),
                [animatedTiming, entry, onAnimationFinished]
        )

        const createExitSharedValueAnimator = useMemo(
                () =>
                        animatedTiming({
                                ...exit,
                                callback: (finished?: boolean) => finished && onAnimationFinished?.(false)
                        }),
                [animatedTiming, exit, onAnimationFinished]
        )

        const opacityOutputRanges = [theme.token.opacity.level0, opacity]
        const fadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(containerSharedValue.value, [0, 1], opacityOutputRanges)
        }))

        const widthOutputRanges = [theme.token.spacing.none, width]
        const transformXOutputRanges = [width, theme.token.spacing.none]
        const collapseXAnimatedStyle = useAnimatedStyle(
                () =>
                        ({
                                ...(scale && {
                                        transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                                }),
                                ...(translate && {
                                        transform: [
                                                {
                                                        translateX: platformValue(
                                                                interpolate(
                                                                        containerSharedValue.value,
                                                                        [0, 1],
                                                                        transformXOutputRanges
                                                                )
                                                        )
                                                }
                                        ]
                                }),
                                width: platformValue(
                                        translate ? width : (
                                                interpolate(containerSharedValue.value, [0, 1], widthOutputRanges)
                                        )
                                )
                        }) as ViewStyle
        )

        const heightOutputRanges = [theme.token.spacing.none, height]
        const transformYOutputRanges = [height, theme.token.spacing.none]
        const collapseYAnimatedStyle = useAnimatedStyle(
                () =>
                        ({
                                ...(scale && {
                                        transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                                }),
                                ...(translate && {
                                        transform: [
                                                {
                                                        translateY: platformValue(
                                                                interpolate(
                                                                        containerSharedValue.value,
                                                                        [0, 1],
                                                                        transformYOutputRanges
                                                                )
                                                        )
                                                }
                                        ]
                                }),
                                height: platformValue(
                                        translate ? height : (
                                                interpolate(containerSharedValue.value, [0, 1], heightOutputRanges)
                                        )
                                )
                        }) as ViewStyle
        )

        const scaleAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scale: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
        }))

        const containerAnimatedTypeStyle = {
                [LAYOUT_ANIMATED.COLLAPSE_X]: collapseXAnimatedStyle,
                [LAYOUT_ANIMATED.COLLAPSE_Y]: collapseYAnimatedStyle,
                [LAYOUT_ANIMATED.FADE]: fadeAnimatedStyle,
                [LAYOUT_ANIMATED.SCALE]: scaleAnimatedStyle,
                [LAYOUT_ANIMATED.STANDARD]: undefined
        }

        const runAnimate = useMemo(
                () =>
                        animatedType !== LAYOUT_ANIMATED.STANDARD ?
                                debounce(
                                        animateLayoutAnimated({
                                                animatedType,
                                                createEntrySharedValueAnimator,
                                                createExitSharedValueAnimator
                                        })(containerSharedValue)
                                )(delay)
                        :       animateLayoutAnimated({
                                        animatedType,
                                        createEntrySharedValueAnimator,
                                        createExitSharedValueAnimator
                                })(containerSharedValue),
                [
                        animatedType,
                        containerSharedValue,
                        createEntrySharedValueAnimator,
                        createExitSharedValueAnimator,
                        delay
                ]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(visible)
                }
        }, [animatedType, runAnimate, status, visible])

        useEffect(
                () => () => {
                        requestIdleCallback(() => cancelAnimation(containerSharedValue))
                },
                [containerSharedValue]
        )

        return {containerAnimatedStyle: containerAnimatedTypeStyle[animatedType]}
}
