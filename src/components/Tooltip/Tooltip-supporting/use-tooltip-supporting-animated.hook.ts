import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {DURATION, EASING} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import {animateTooltipSupporting} from './Tooltip-supporting.handler'
import type {UseTooltipSupportingAnimatedOptions} from './Tooltip-supporting.interface'

export const useTooltipSupportingAnimated = ({
        height = 0,
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

        const horizontalEndOutputRanges = [-theme.token.spacing.small, theme.token.spacing.none]
        const horizontalStartOutputRanges = [theme.token.spacing.small, theme.token.spacing.none]
        const verticalEndOutputRanges = [-theme.token.spacing.small, theme.token.spacing.none]
        const verticalStartOutputRanges = [theme.token.spacing.small, theme.token.spacing.none]
        const contentAnimatedStyle = useAnimatedStyle(
                () =>
                        ({
                                opacity: interpolate(
                                        opacitySharedValue.value,
                                        [0, 1],
                                        [theme.token.opacity.level0, theme.token.opacity.level10]
                                ),
                                ...(type === TOOLTIP_TYPE.MENU ?
                                        {
                                                height: platformValue(
                                                        interpolate(heightSharedValue.value, [0, 1], [0, height])
                                                )
                                        }
                                :       {
                                                ...(position === SUPPORTING_POSITION.VERTICAL_START && {
                                                        transform: [
                                                                {
                                                                        translateY: platformValue(
                                                                                interpolate(
                                                                                        transformSharedValue.value,
                                                                                        [0, 1],
                                                                                        verticalStartOutputRanges
                                                                                )
                                                                        )
                                                                }
                                                        ]
                                                }),
                                                ...(position === SUPPORTING_POSITION.VERTICAL_END && {
                                                        transform: [
                                                                {
                                                                        translateY: platformValue(
                                                                                interpolate(
                                                                                        transformSharedValue.value,
                                                                                        [0, 1],
                                                                                        verticalEndOutputRanges
                                                                                )
                                                                        )
                                                                }
                                                        ]
                                                }),
                                                ...(position === SUPPORTING_POSITION.HORIZONTAL_START && {
                                                        transform: [
                                                                {
                                                                        translateX: platformValue(
                                                                                interpolate(
                                                                                        transformSharedValue.value,
                                                                                        [0, 1],
                                                                                        horizontalStartOutputRanges
                                                                                )
                                                                        )
                                                                }
                                                        ]
                                                }),
                                                ...(position === SUPPORTING_POSITION.HORIZONTAL_END && {
                                                        transform: [
                                                                {
                                                                        translateX: platformValue(
                                                                                interpolate(
                                                                                        transformSharedValue.value,
                                                                                        [0, 1],
                                                                                        horizontalEndOutputRanges
                                                                                )
                                                                        )
                                                                }
                                                        ]
                                                })
                                        })
                        }) as ViewStyle
        )

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
                        requestIdleCallback(() => {
                                cancelAnimation(heightSharedValue)
                                cancelAnimation(opacitySharedValue)
                                cancelAnimation(transformSharedValue)
                        })
                },
                [heightSharedValue, opacitySharedValue, transformSharedValue]
        )

        return {contentAnimatedStyle}
}
