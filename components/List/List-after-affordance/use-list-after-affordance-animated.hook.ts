import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed, status}: UseListAfterAffordanceAnimatedOptions) => {
        const translateXSharedValue = useSharedValue(0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const dangerTranslateXOutputRanges = useMemo(
                () => [spacing.none, -((spacing.extraSmall * 40) / 2)],
                [spacing.extraSmall, spacing.none]
        )

        const dangerAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {
                                translateX: interpolate(
                                        translateXSharedValue.value,
                                        [0, 1],
                                        dangerTranslateXOutputRanges
                                )
                        }
                ]
        }))

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
