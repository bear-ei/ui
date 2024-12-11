import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {AnimatableValue, SharedValue, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

const handleListAfterAffordanceAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (translateXSharedValue: SharedValue<AnimatableValue>) =>
        (doubleConfirmed?: boolean) => {
                if (typeof doubleConfirmed === 'boolean') {
                        animatedTiming()(translateXSharedValue)(doubleConfirmed ? 1 : 0)
                }
        }

export const useListAfterAffordanceAnimated = ({doubleConfirmed}: UseListAfterAffordanceAnimatedOptions) => {
        const translateXSharedValue = useSharedValue(0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming(theme.token)
        const translateXOutputRange = [theme.adaptSize(spacing.none), -(theme.adaptSize(spacing.extraSmall * 28) / 2)]
        const dangerAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {
                                translateX: interpolate(translateXSharedValue.value, [0, 1], translateXOutputRange)
                        }
                ]
        }))

        const onListAfterAffordanceAnimatedTiming = useMemo(
                () => handleListAfterAffordanceAnimatedTiming(animatedTiming)(translateXSharedValue),
                [animatedTiming, translateXSharedValue]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onListAfterAffordanceAnimatedTiming(doubleConfirmed))
        }, [doubleConfirmed, onListAfterAffordanceAnimatedTiming])

        return {dangerAnimatedStyle}
}
