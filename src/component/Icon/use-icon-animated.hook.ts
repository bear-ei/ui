import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hook'
import {EventName} from '../Common'
import {UseIconAnimatedOptions} from './Icon.interface'

const handleIconAnimatedTiming =
    (animatedTiming: AnimatedTiming) =>
    (scaleSharedValue: SharedValue<AnimatableValue>) =>
    (eventName: EventName = 'none') => {
        const toValue = ['pressIn', 'longPress'].includes(eventName) ? 0 : 1

        animatedTiming()(scaleSharedValue)(eventName === 'hoverIn' ? 2 : toValue)
    }

export const useIconAnimated = ({eventName}: UseIconAnimatedOptions) => {
    const scaleSharedValue = useSharedValue(1)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: interpolate(scaleSharedValue.value, [0, 1, 2], [0.97, 1, 1.03], Extrapolation.CLAMP)}]
    }))

    const onIconAnimatedTiming = useMemo(
        () => handleIconAnimatedTiming(animatedTiming)(scaleSharedValue),
        [animatedTiming, scaleSharedValue]
    )

    useEffect(() => {
        onIconAnimatedTiming(eventName)
    }, [eventName, onIconAnimatedTiming])

    return {containerAnimatedStyle}
}
