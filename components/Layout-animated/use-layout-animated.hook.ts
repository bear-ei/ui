import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {animateLayoutAnimated} from './Layout-animated.handler'
import type {UseLayoutAnimatedOptions} from './Layout-animated.interface'

export const useLayoutAnimated = ({
        animatedType = LAYOUT_ANIMATED.FADE,
        entry,
        exit,
        height,
        onAnimationFinished,
        opacity: rawOpacity,
        scale,
        status,
        translate,
        visible,
        width
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

        const widthOutputRanges = [theme.token.spacing.none, width ?? theme.token.spacing.none]
        const transformXOutputRanges = [width ?? theme.token.spacing.none, theme.token.spacing.none]
        const collapseXAnimatedStyle = useAnimatedStyle(() => ({
                width: translate ? width : interpolate(containerSharedValue.value, [0, 1], widthOutputRanges),
                ...(scale && {transform: [{scaleX: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]}),
                ...(translate && {
                        transform: [
                                {translateX: interpolate(containerSharedValue.value, [0, 1], transformXOutputRanges)}
                        ]
                })
        }))

        const heightOutputRanges = [theme.token.spacing.none, height ?? theme.token.spacing.none]
        const transformYOutputRanges = [height ?? theme.token.spacing.none, theme.token.spacing.none]
        const collapseYAnimatedStyle = useAnimatedStyle(() => ({
                height: translate ? height : interpolate(containerSharedValue.value, [0, 1], heightOutputRanges),
                ...(scale && {transform: [{scaleY: interpolate(containerSharedValue.value, [0, 1], [0, 1])}]}),
                ...(translate && {
                        transform: [
                                {translateY: interpolate(containerSharedValue.value, [0, 1], transformYOutputRanges)}
                        ]
                })
        }))

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
