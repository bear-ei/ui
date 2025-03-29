import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../hooks'
import {EventName} from '../Common'
import {HandleUnderlayHoveredAnimatedTimingOptions} from './Underlay.interface'

export const handleUnderlayHoveredAnimatedTiming = ({
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

        return (hoverLayerSharedValue: SharedValue<number>) => (eventName?: EventName) =>
                eventName && eventKeys.includes(eventName) && animatedTiming()(hoverLayerSharedValue)(event[eventName])
}

export const handleUnderlayActiveAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (activeLayerSharedValue: SharedValue<number>) => (value?: boolean) =>
                typeof value === 'boolean' && animatedTiming()(activeLayerSharedValue)(value ? 1 : 0)
