import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {DURATION, EASING} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverType} from '..'
import {animatePopoverContent} from './Popover-content.handler'
import type {UsePopoverContentAnimatedOptions} from './Popover-content.interface'

export const usePopoverContentAnimated = ({
        height = 0,
        onClose,
        position = POPOVER_CONTENT_POSITION.VERTICAL_START,
        status,
        type = POPOVER_TYPE.PLAIN,
        visible
}: UsePopoverContentAnimatedOptions) => {
        const isMenuOrPicker = (
                [POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
        ).includes(type)

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
                                ...(isMenuOrPicker ?
                                        {
                                                height: platformValue(
                                                        interpolate(heightSharedValue.value, [0, 1], [0, height])
                                                )
                                        }
                                :       {
                                                ...(position === POPOVER_CONTENT_POSITION.VERTICAL_START && {
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
                                                ...(position === POPOVER_CONTENT_POSITION.VERTICAL_END && {
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
                                                ...(position === POPOVER_CONTENT_POSITION.HORIZONTAL_START && {
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
                                                ...(position === POPOVER_CONTENT_POSITION.HORIZONTAL_END && {
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
                        animatePopoverContent({
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
