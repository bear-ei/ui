import {COMPONENT_STATUS, LAYOUT} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateVirtualListItemScale, animateVirtualListItemTranslate} from './Virtual-list-item.handler'
import type {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

export const useVirtualListItemAnimated = ({
    dragging,
    layoutType,
    offset = 0,
    onAnimationFinished,
    status
}: UseVirtualListItemAnimatedOptions) => {
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming({token: theme.token})
    const animateTranslateYSharedValueTo = useMemo(
        () => animatedTiming({callback: (finished?: boolean) => finished && onAnimationFinished?.()}),
        [animatedTiming, onAnimationFinished]
    )

    const animateScaleSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
    const translateSharedValue = useSharedValue(offset)
    const scaleSharedValue = useSharedValue(0)
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        ...(layoutType === LAYOUT.VERTICAL &&
            ({
                transform: [
                    {translateY: platformValue(translateSharedValue.value)},
                    {scale: interpolate(scaleSharedValue.value, [0, 1], [1, 0.99])}
                ]
            } as ViewStyle)),
        ...(layoutType === LAYOUT.HORIZONTAL &&
            ({
                transform: [
                    {translateX: platformValue(translateSharedValue.value)},
                    {scale: interpolate(scaleSharedValue.value, [0, 1], [1, 0.99])}
                ]
            } as ViewStyle))
    }))

    const runAnimateTranslate = useMemo(
        () => animateVirtualListItemTranslate(animateTranslateYSharedValueTo)(translateSharedValue),
        [animateTranslateYSharedValueTo, translateSharedValue]
    )

    const runAnimateScale = useMemo(
        () => animateVirtualListItemScale(animateScaleSharedValueTo)(scaleSharedValue),
        [animateScaleSharedValueTo, scaleSharedValue]
    )

    useEffect(() => {
        if (status === COMPONENT_STATUS.SUCCEEDED && !dragging) {
            runAnimateTranslate(offset)
        }
    }, [dragging, offset, runAnimateTranslate, status])

    useEffect(() => {
        if (status === COMPONENT_STATUS.SUCCEEDED) {
            runAnimateScale(dragging)
        }
    }, [dragging, runAnimateScale, status])

    useEffect(
        () => () => {
            cancelAnimation(translateSharedValue)
        },
        [translateSharedValue]
    )

    return {containerAnimatedStyle}
}
