import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../hooks'

export const handleElevationAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
                animatedTiming()(shadowSharedValue)(level)
