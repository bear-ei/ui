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
import {useAnimatedTiming} from '../../hook'
import {HandleLayoutAnimatedTimingOptions, UseLayoutAnimatedOptions} from './Layout-animated.interface'

const handleLayoutAnimatedTiming =
    ({animatedTiming, onAnimatedFinished, entry, exit}: HandleLayoutAnimatedTimingOptions) =>
    (opacitySharedValue: SharedValue<AnimatableValue>) =>
    (visible?: boolean) =>
        typeof visible === 'boolean' &&
        animatedTiming({
            ...(visible ? entry : exit),
            callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
        })(opacitySharedValue)(visible ? 1 : 0)

export const useLayoutAnimated = ({visible = true, onAnimatedFinished, entry, exit}: UseLayoutAnimatedOptions) => {
    const opacitySharedValue = useSharedValue(visible ? 1 : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const opacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacitySharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP)
    }))

    const onLayoutAnimatedTiming = useMemo(
        () => handleLayoutAnimatedTiming({animatedTiming, onAnimatedFinished, entry, exit})(opacitySharedValue),
        [animatedTiming, entry, exit, onAnimatedFinished, opacitySharedValue]
    )

    useEffect(() => {
        onLayoutAnimatedTiming(visible)
    }, [visible, onLayoutAnimatedTiming])

    return {opacityAnimatedStyle}
}
