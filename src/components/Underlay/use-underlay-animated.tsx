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
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {debounce} from '../../utils'
import {EventName} from '../Common'
import {HandleUnderlayHoveredAnimatedTimingOptions, UseUnderlayAnimatedOptions} from './Underlay.interface'

const handleUnderlayHoveredAnimatedTiming =
    ({animatedTiming, activeValue}: HandleUnderlayHoveredAnimatedTimingOptions) =>
    (hoverLayerSharedValue: SharedValue<AnimatableValue>) =>
    (eventName?: EventName) => {
        const event = {
            blur: 0,
            focus: activeValue,
            hoverIn: 1,
            hoverOut: 0,
            longPress: activeValue,
            none: 0,
            press: 1,
            pressIn: activeValue,
            pressOut: 1
        } as Record<EventName, number>

        eventName && animatedTiming()(hoverLayerSharedValue)(event[eventName] ?? 0)
    }

const handleUnderlayActiveAnimatedTiming =
    (animatedTiming: AnimatedTiming) => (activeLayerSharedValue: SharedValue<AnimatableValue>) => (value?: boolean) =>
        typeof value === 'boolean' && animatedTiming()(activeLayerSharedValue)(value ? 1 : 0)

export const useUnderlayAnimated = ({
    active,
    activeAnimatedType = 'scale',
    activeScale,
    eventName,
    opacities = [0, 0.08, 0.12]
}: UseUnderlayAnimatedOptions) => {
    const {x: scaleX = 1, y: scaleY = 1} = activeScale ?? {}
    const defaultScaleValue = active ? 1 : 0
    const activeValue = opacities.length === 3 ? opacities.length - 1 : 0
    const hoverLayerSharedValue = useSharedValue(0)
    const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const opacityInputRange = opacities.map((_value, index) => index)
    const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(hoverLayerSharedValue.value, opacityInputRange, opacities, Extrapolation.CLAMP)
    }))

    const isScaleX = ['scale', 'scaleX'].includes(activeAnimatedType)
    const isScaleY = ['scale', 'scaleY'].includes(activeAnimatedType)
    const isScale = isScaleX || isScaleY
    const activeLayerAnimatedStyle = useAnimatedStyle(() => ({
        ...(isScale && {
            transform: [
                {
                    scaleX:
                        isScaleX ?
                            interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleX], Extrapolation.CLAMP)
                        :   1
                },
                {
                    scaleY:
                        isScaleY ?
                            interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleY], Extrapolation.CLAMP)
                        :   1
                }
            ]
        }),
        opacity: interpolate(activeLayerSharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP)
    }))

    const onUnderlayHoveredAnimatedTiming = useMemo(
        () =>
            debounce((value?: EventName) =>
                handleUnderlayHoveredAnimatedTiming({activeValue, animatedTiming})(hoverLayerSharedValue)(value)
            )(100),
        [animatedTiming, activeValue, hoverLayerSharedValue]
    )

    const onUnderlayActiveAnimatedTiming = useMemo(
        () => handleUnderlayActiveAnimatedTiming(animatedTiming)(activeLayerSharedValue),
        [animatedTiming, activeLayerSharedValue]
    )

    useEffect(() => {
        onUnderlayHoveredAnimatedTiming(eventName)
    }, [eventName, onUnderlayHoveredAnimatedTiming])

    useEffect(() => {
        onUnderlayActiveAnimatedTiming(active)
    }, [active, onUnderlayActiveAnimatedTiming])

    return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle}
}
