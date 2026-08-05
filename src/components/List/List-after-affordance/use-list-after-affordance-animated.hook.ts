import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed, status}: UseListAfterAffordanceAnimatedOptions) => {
    const translateXSharedValue = useSharedValue(0)
    const theme = useTheme()
    const {spacing} = theme.token
    const animatedTiming = useAnimatedTiming({token: theme.token})
    const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
    const dangerTranslateXOutputRanges = [spacing.none, -((spacing.extraSmall * 32) / 2)]
    const dangerAnimatedStyle = useAnimatedStyle(
        () =>
            ({
                transform: [
                    {
                        translateX: platformValue(
                            interpolate(translateXSharedValue.value, [0, 1], dangerTranslateXOutputRanges)
                        )
                    }
                ]
            }) as ViewStyle
    )

    const runTranslateXAnimate = useMemo(
        () => animateListAfterAffordance(animateSharedValueTo)(translateXSharedValue),
        [animateSharedValueTo, translateXSharedValue]
    )

    useEffect(() => {
        if (status === COMPONENT_STATUS.SUCCEEDED) {
            runTranslateXAnimate(doubleConfirmed)
        }
    }, [doubleConfirmed, runTranslateXAnimate, status])

    useEffect(
        () => () => {
            cancelAnimation(translateXSharedValue)
        },
        [translateXSharedValue]
    )

    return {dangerAnimatedStyle}
}
