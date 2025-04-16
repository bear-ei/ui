import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../hooks'
import type {EventName} from '../Common'
import type {HandleUnderlayHoveredAnimatedTimingOptions} from './Underlay.interface'

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
	(animatedTiming: AnimatedTiming) => (activeLayerSharedValue: SharedValue<number>) => (active?: boolean) =>
		typeof active === 'boolean' && animatedTiming()(activeLayerSharedValue)(active ? 1 : 0)
