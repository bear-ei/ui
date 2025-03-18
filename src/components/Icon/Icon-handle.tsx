import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../hooks'
import {EventName} from '../Common'

export const handleIconAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (scaleSharedValue: SharedValue<number>) =>
        (eventName: EventName = 'none') => {
                const toValue = new Set(['pressIn', 'longPress']).has(eventName) ? 0 : 1

                animatedTiming()(scaleSharedValue)(eventName === 'hoverIn' ? 2 : toValue)
        }
