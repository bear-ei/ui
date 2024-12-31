import {useEffect, useMemo} from 'react'
import {SharedValue, cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {debounce} from '../../utils'
import {EventName} from '../Common'
import {HandleUnderlayHoveredAnimatedTimingOptions, UseUnderlayAnimatedOptions} from './Underlay.interface'

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

        return (hoverLayerSharedValue: SharedValue<number>) => (eventName?: EventName) => {
                if (eventName && eventKeys.includes(eventName)) {
                        cancelAnimation(hoverLayerSharedValue)
                        animatedTiming()(hoverLayerSharedValue)(event[eventName])
                }
        }
}

const handleUnderlayActiveAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (activeLayerSharedValue: SharedValue<number>) => (value?: boolean) => {
                if (typeof value === 'boolean') {
                        animatedTiming()(activeLayerSharedValue)(value ? 1 : 0)
                }
        }

export const useUnderlayAnimated = ({
        active,
        activeAnimatedType = 'scaleX',
        activeScale,
        eventName,
        opacities: rawOpacities
}: UseUnderlayAnimatedOptions) => {
        const theme = useTheme()
        const opacities =
                rawOpacities?.length ? rawOpacities : (
                        [theme.token.opacity.level0, theme.token.opacity.level1, theme.token.opacity.level2]
                )

        const {x: scaleX = 1.2, y: scaleY = 1.2} = activeScale ?? {}
        const defaultScaleValue = active ? 1 : 0
        const activeValue = useMemo(() => (opacities.length === 3 ? opacities.length - 1 : 0), [opacities.length])
        const hoverLayerSharedValue = useSharedValue(0)
        const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const opacityInputRange = opacities.map((_value, index) => index)
        const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(hoverLayerSharedValue.value, opacityInputRange, opacities)
        }))

        const activeLayerFadeAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(
                        activeLayerSharedValue.value,
                        [0, 1],
                        [theme.token.opacity.level0, theme.token.opacity.level10]
                )
        }))

        const activeLayerScaleXAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scaleX: interpolate(activeLayerSharedValue.value, [0.3, 1], [0, scaleX])}],
                opacity: interpolate(
                        activeLayerSharedValue.value,
                        [0, 1],
                        [theme.token.opacity.level0, theme.token.opacity.level10]
                )
        }))

        const activeLayerScaleYAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scaleY: interpolate(activeLayerSharedValue.value, [0.3, 1], [0, scaleY])}],
                opacity: interpolate(
                        activeLayerSharedValue.value,
                        [0, 1],
                        [theme.token.opacity.level0, theme.token.opacity.level10]
                )
        }))

        const activeLayerAnimated = {
                scale: {
                        ...activeLayerScaleXAnimatedStyle,
                        ...activeLayerScaleYAnimatedStyle
                },
                scaleX: activeLayerScaleXAnimatedStyle,
                scaleY: activeLayerScaleYAnimatedStyle,
                fade: activeLayerFadeAnimatedStyle
        }

        const onUnderlayHoveredAnimatedTiming = useMemo(
                () => handleUnderlayHoveredAnimatedTiming({activeValue, animatedTiming})(hoverLayerSharedValue),
                [animatedTiming, activeValue, hoverLayerSharedValue]
        )

        const onUnderlayActiveAnimatedTiming = useMemo(
                () => debounce(handleUnderlayActiveAnimatedTiming(animatedTiming)(activeLayerSharedValue))(50),
                [animatedTiming, activeLayerSharedValue]
        )

        useEffect(() => {
                onUnderlayHoveredAnimatedTiming(eventName)
        }, [eventName, onUnderlayHoveredAnimatedTiming])

        useEffect(() => {
                onUnderlayActiveAnimatedTiming(active)
        }, [active, onUnderlayActiveAnimatedTiming])

        return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle: activeLayerAnimated[activeAnimatedType]}
}
