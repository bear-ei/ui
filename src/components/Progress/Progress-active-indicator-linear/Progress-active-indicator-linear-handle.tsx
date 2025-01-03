import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'

export const handleProgressActiveIndicatorLinearAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (widthSharedValue: SharedValue<number>) => (value?: number) => {
                if (typeof value === 'number') {
                        animatedTiming()(widthSharedValue)(value)
                }
        }

export const handleOutputRange = (width: number) => (increment: number) => {
        const actualIncrement = width * (increment / 100)

        return Array.from({length: Math.ceil(width / actualIncrement) + 1}, (_, index) =>
                Math.ceil(index * actualIncrement)
        )
}
