import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {pxToRem} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {Platform, ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed, status}: UseListAfterAffordanceAnimatedOptions) => {
        const translateXSharedValue = useSharedValue(0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const dangerTranslateXOutputRanges = Platform.select({
                web: [pxToRem()(spacing.none), -pxToRem()((spacing.extraSmall * 32) / 2)],
                default: [spacing.none, -((spacing.extraSmall * 32) / 2)]
        })

        const dangerAnimatedStyle = useAnimatedStyle(() => {
                const translateXInterpolate = interpolate(
                        translateXSharedValue.value,
                        [0, 1],
                        dangerTranslateXOutputRanges
                )

                return {
                        transform: Platform.select({
                                default: [{translateX: translateXInterpolate}],
                                web: [{translateX: `${translateXInterpolate}rem`}]
                        })
                } as ViewStyle
        })

        const runTranslateXAnimate = useMemo(
                () => animateListAfterAffordance(animateSharedValueTo)(translateXSharedValue),
                [animateSharedValueTo, translateXSharedValue]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runTranslateXAnimate(doubleConfirmed)
                }
        }, [doubleConfirmed, runTranslateXAnimate, status])

        useEffect(() => () => cancelAnimation(translateXSharedValue), [translateXSharedValue])

        return {dangerAnimatedStyle}
}
