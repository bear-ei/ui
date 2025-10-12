import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {pxToRem} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {Platform, ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'
import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
        animatedType = LAYOUT_ANIMATED.FADE,
        entry,
        exit,
        height: rawHeight,
        onAnimationFinished,
        opacity: rawOpacity,
        scale,
        status,
        translate,
        visible,
        width: rawWidth
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

        const width = Platform.select({
                web: pxToRem()(rawWidth ?? theme.token.spacing.none),
                default: rawWidth ?? theme.token.spacing.none
        })

        const widthOutputRanges = Platform.select({
                default: [pxToRem()(theme.token.spacing.none), width],
                web: [theme.token.spacing.none, width]
        })

        const transformXOutputRanges = Platform.select({
                web: [width, pxToRem()(theme.token.spacing.none)],
                default: [width, theme.token.spacing.none]
        })

        const collapseXAnimatedStyle = useAnimatedStyle(() => {
                const translateXInterpolate = interpolate(containerSharedValue.value, [0, 1], transformXOutputRanges)
                const widthInterpolate =
                        translate ? width : interpolate(containerSharedValue.value, [0, 1], widthOutputRanges)

                return {
                        ...(scale && {
                                transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                        }),
                        ...(translate && {
                                transform: Platform.select({
                                        web: [{translateX: `${translateXInterpolate}rem`}],
                                        default: [{translateX: translateXInterpolate}]
                                })
                        }),
                        ...Platform.select({
                                web: {width: `${widthInterpolate}rem`},
                                default: {width: widthInterpolate}
                        })
                } as ViewStyle
        })

        const height = Platform.select({
                web: pxToRem()(rawHeight ?? theme.token.spacing.none),
                default: rawHeight ?? theme.token.spacing.none
        })

        const heightOutputRanges = Platform.select({
                web: [pxToRem()(theme.token.spacing.none), height],
                default: [theme.token.spacing.none, height]
        })

        const transformYOutputRanges = Platform.select({
                web: [height, pxToRem()(theme.token.spacing.none)],
                default: [height, theme.token.spacing.none]
        })

        const collapseYAnimatedStyle = useAnimatedStyle(() => {
                const translateYInterpolate = interpolate(containerSharedValue.value, [0, 1], transformYOutputRanges)
                const heightInterpolate =
                        translate ? height : interpolate(containerSharedValue.value, [0, 1], heightOutputRanges)

                return {
                        ...(scale && {
                                transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]
                        }),

                        ...(translate && {
                                transform: Platform.select({
                                        web: [{translateY: `${translateYInterpolate}rem`}],
                                        default: [{translateY: translateYInterpolate}]
                                })
                        }),
                        ...Platform.select({
                                web: {height: `${heightInterpolate}rem`},
                                default: {height: heightInterpolate}
                        })
                } as ViewStyle
        })

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
                        animateLayoutAnimated({
                                animatedType,
                                createEntrySharedValueAnimator,
                                createExitSharedValueAnimator
                        })(containerSharedValue),
                [animatedType, containerSharedValue, createEntrySharedValueAnimator, createExitSharedValueAnimator]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(visible)
                }
        }, [animatedType, runAnimate, status, visible])

        useEffect(() => () => cancelAnimation(containerSharedValue), [containerSharedValue])

        return {containerAnimatedStyle: containerAnimatedTypeStyle[animatedType]}
}
