import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../hooks'
import type {EventName} from '../Common'

export const handleIconAnimatedTiming =
	(animatedTiming: AnimatedTiming) =>
	(scaleSharedValue: SharedValue<number>) =>
	(eventName: EventName = 'none') => {
		const toValue = ['pressIn', 'longPress'].includes(eventName) ? 0 : 1

		animatedTiming()(scaleSharedValue)(eventName === 'hoverIn' ? 2 : toValue)
	}
