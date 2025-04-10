import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleListAfterAffordanceAnimatedTiming} from './List-after-affordance-handle'
import {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed}: UseListAfterAffordanceAnimatedOptions) => {
        const translateXSharedValue = useSharedValue(0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const dangerTranslateXOutputRanges = [
                theme.adaptSize(spacing.none),
                -(theme.adaptSize(spacing.extraSmall * 34) / 2)
        ]

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

        const onListAfterAffordanceAnimatedTiming = useMemo(
                () => handleListAfterAffordanceAnimatedTiming(animatedTiming)(translateXSharedValue),
                [animatedTiming, translateXSharedValue]
        )

        useEffect(() => {
                onListAfterAffordanceAnimatedTiming(doubleConfirmed)
        }, [doubleConfirmed, onListAfterAffordanceAnimatedTiming])

        return {dangerAnimatedStyle}
}
