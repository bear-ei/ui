import {COMPONENT_STATUS, DURATION, EASING} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {pxToRem} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {Platform, ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import {animateTooltipSupporting} from './Tooltip-supporting.handler'
import type {UseTooltipSupportingAnimatedOptions} from './Tooltip-supporting.interface'

export const useTooltipSupportingAnimated = ({
        height: rawHeight = 0,
        onClose,
        position = SUPPORTING_POSITION.VERTICAL_START,
        status,
        type = TOOLTIP_TYPE.PLAIN,
        visible
}: UseTooltipSupportingAnimatedOptions) => {
        const heightSharedValue = useSharedValue(0)
        const opacitySharedValue = useSharedValue(0)
        const transformSharedValue = useSharedValue(0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const createEntrySharedValueAnimator = useMemo(
                () => animatedTiming({duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}),
                [animatedTiming]
        )

        const createExitSharedValueAnimator = useMemo(
                () =>
                        animatedTiming({
                                callback: (finished?: boolean) => finished && onClose?.(true),
                                duration: DURATION.SHORT_3,
                                easing: EASING.EMPHASIZED_ACCELERATE
                        }),
                [animatedTiming, onClose]
        )

        const verticalStartOutputRanges = Platform.select({
                default: [theme.token.spacing.small, theme.token.spacing.none],
                web: [pxToRem()(theme.token.spacing.small), pxToRem()(theme.token.spacing.none)]
        })

        const verticalEndOutputRanges = Platform.select({
                default: [-theme.token.spacing.small, theme.token.spacing.none],
                web: [-pxToRem()(theme.token.spacing.small), pxToRem()(theme.token.spacing.none)]
        })

        const horizontalStartOutputRanges = Platform.select({
                default: [theme.token.spacing.small, theme.token.spacing.none],
                web: [pxToRem()(theme.token.spacing.small), pxToRem()(theme.token.spacing.none)]
        })

        const horizontalEndOutputRanges = Platform.select({
                default: [-theme.token.spacing.small, theme.token.spacing.none],
                web: [-pxToRem()(theme.token.spacing.small), pxToRem()(theme.token.spacing.none)]
        })

        const height = Platform.select({
                web: pxToRem()(rawHeight),
                default: rawHeight
        })

        const contentAnimatedStyle = useAnimatedStyle(() => {
                const verticalStartTranslateYInterpolate = interpolate(
                        transformSharedValue.value,
                        [0, 1],
                        verticalStartOutputRanges
                )

                const verticalEndTranslateYInterpolate = interpolate(
                        transformSharedValue.value,
                        [0, 1],
                        verticalEndOutputRanges
                )

                const horizontalStartTranslateXInterpolate = interpolate(
                        transformSharedValue.value,
                        [0, 1],
                        horizontalStartOutputRanges
                )

                const horizontalEndTranslateXInterpolate = interpolate(
                        transformSharedValue.value,
                        [0, 1],
                        horizontalEndOutputRanges
                )

                const heightInterpolate = interpolate(heightSharedValue.value, [0, 1], [0, height])

                return {
                        opacity: interpolate(
                                opacitySharedValue.value,
                                [0, 1],
                                [theme.token.opacity.level0, theme.token.opacity.level10]
                        ),

                        ...(type === TOOLTIP_TYPE.MENU ?
                                Platform.select({
                                        default: {height: heightInterpolate},
                                        web: {height: `${heightInterpolate}rem`}
                                })
                        :       {
                                        ...(position === SUPPORTING_POSITION.VERTICAL_START && {
                                                transform: Platform.select({
                                                        default: [{translateY: verticalStartTranslateYInterpolate}],
                                                        web: [{translateY: `${verticalStartTranslateYInterpolate}rem`}]
                                                })
                                        }),
                                        ...(position === SUPPORTING_POSITION.VERTICAL_END && {
                                                transform: Platform.select({
                                                        default: [{translateY: verticalEndTranslateYInterpolate}],
                                                        web: [{translateY: `${verticalEndTranslateYInterpolate}rem`}]
                                                })
                                        }),
                                        ...(position === SUPPORTING_POSITION.HORIZONTAL_START && {
                                                transform: Platform.select({
                                                        default: [{translateX: horizontalStartTranslateXInterpolate}],
                                                        web: [
                                                                {
                                                                        translateX: `${horizontalStartTranslateXInterpolate}rem`
                                                                }
                                                        ]
                                                })
                                        }),
                                        ...(position === SUPPORTING_POSITION.HORIZONTAL_END && {
                                                transform: Platform.select({
                                                        default: [{translateX: horizontalEndTranslateXInterpolate}],
                                                        web: [
                                                                {
                                                                        translateX: `${horizontalEndTranslateXInterpolate}rem`
                                                                }
                                                        ]
                                                })
                                        })
                                })
                } as ViewStyle
        })

        const runAnimate = useMemo(
                () =>
                        animateTooltipSupporting({
                                createEntrySharedValueAnimator,
                                createExitSharedValueAnimator,
                                onClose,
                                type
                        })({
                                heightSharedValue,
                                opacitySharedValue,
                                transformSharedValue
                        }),
                [
                        createEntrySharedValueAnimator,
                        createExitSharedValueAnimator,
                        heightSharedValue,
                        onClose,
                        opacitySharedValue,
                        transformSharedValue,
                        type
                ]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(visible)
                }
        }, [runAnimate, status, visible])

        useEffect(
                () => () => {
                        cancelAnimation(heightSharedValue)
                        cancelAnimation(opacitySharedValue)
                        cancelAnimation(transformSharedValue)
                },
                [heightSharedValue, opacitySharedValue, transformSharedValue]
        )

        return {contentAnimatedStyle}
}
