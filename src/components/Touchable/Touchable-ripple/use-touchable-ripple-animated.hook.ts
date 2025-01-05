import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleTouchableRippleAnimatedTiming} from './Touchable-ripple-handle'
import {UseTouchableRippleAnimatedOptions} from './Touchable-ripple.interface'

export const useTouchableRippleAnimated = ({
        indexKey,
        onAnimatedFinished,
        radius
}: UseTouchableRippleAnimatedOptions) => {
        const opacitySharedValue = useSharedValue(1)
        const scaleSharedValue = useSharedValue(0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(
                        opacitySharedValue.value,
                        [0, 1],
                        [theme.token.opacity.level0, theme.token.opacity.level10]
                ),
                transform: [
                        {translateX: -radius},
                        {translateY: -radius},
                        {scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1])}
                ]
        }))

        const onTouchableRippleAnimatedTiming = useMemo(
                () =>
                        handleTouchableRippleAnimatedTiming({animatedTiming, onAnimatedFinished})({
                                scaleSharedValue,
                                opacitySharedValue
                        }),
                [animatedTiming, onAnimatedFinished, opacitySharedValue, scaleSharedValue]
        )

        useEffect(() => {
                onTouchableRippleAnimatedTiming(indexKey)
        }, [onTouchableRippleAnimatedTiming, indexKey])

        return {containerAnimatedStyle}
}
