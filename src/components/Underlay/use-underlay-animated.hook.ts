import {useEffect, useMemo} from 'react'
import {
        AnimatableValue,
        SharedValue,
        cancelAnimation,
        interpolate,
        useAnimatedStyle,
        useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {EventName} from '../Common'
import {
        HandleUnderlayActiveAnimatedTimingOptions,
        HandleUnderlayHoveredAnimatedTimingOptions,
        UseUnderlayAnimatedOptions
} from './Underlay.interface'

const handleUnderlayHoveredAnimatedTiming = ({
        animatedTiming,
        activeValue
}: HandleUnderlayHoveredAnimatedTimingOptions) => {
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

        const eventKeys = Object.keys(event)

        return (hoverLayerSharedValue: SharedValue<AnimatableValue>) => (eventName?: EventName) => {
                if (eventName && eventKeys.includes(eventName)) {
                        cancelAnimation(hoverLayerSharedValue)
                        animatedTiming()(hoverLayerSharedValue)(event[eventName])
                }
        }
}

const handleUnderlayActiveAnimatedTiming =
        ({animatedTiming, layout}: HandleUnderlayActiveAnimatedTimingOptions) =>
        (activeLayerSharedValue: SharedValue<AnimatableValue>) =>
        (value?: boolean) => {
                if (typeof value === 'boolean') {
                        animatedTiming({
                                duration: Math.max(300, (layout.width ?? 300) / 2)
                        })(activeLayerSharedValue)(value ? 1 : 0)
                }
        }

export const useUnderlayAnimated = ({
        active,
        activeAnimatedType = 'scale',
        activeScale,
        eventName,
        opacities = [0, 0.08, 0.12],
        layout
}: UseUnderlayAnimatedOptions) => {
        const {x: scaleX = 1, y: scaleY = 1} = activeScale ?? {}
        const defaultScaleValue = active ? 1 : 0
        const activeValue = useMemo(() => (opacities.length === 3 ? opacities.length - 1 : 0), [opacities.length])
        const hoverLayerSharedValue = useSharedValue(0)
        const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const opacityInputRange = opacities.map((_value, index) => index)
        const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(hoverLayerSharedValue.value, opacityInputRange, opacities)
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
                                                        interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleX])
                                                :       1
                                },
                                {
                                        scaleY:
                                                isScaleY ?
                                                        interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleY])
                                                :       1
                                }
                        ]
                }),
                opacity: interpolate(activeLayerSharedValue.value, [0, 1], [0, 1])
        }))

        const onUnderlayHoveredAnimatedTiming = useMemo(
                () => handleUnderlayHoveredAnimatedTiming({activeValue, animatedTiming})(hoverLayerSharedValue),
                [animatedTiming, activeValue, hoverLayerSharedValue]
        )

        const onUnderlayActiveAnimatedTiming = useMemo(
                () => handleUnderlayActiveAnimatedTiming({animatedTiming, layout})(activeLayerSharedValue),
                [animatedTiming, layout, activeLayerSharedValue]
        )

        useEffect(() => {
                onUnderlayHoveredAnimatedTiming(eventName)
        }, [eventName, onUnderlayHoveredAnimatedTiming])

        useEffect(() => {
                onUnderlayActiveAnimatedTiming(active)
        }, [active, onUnderlayActiveAnimatedTiming])

        return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle}
}
