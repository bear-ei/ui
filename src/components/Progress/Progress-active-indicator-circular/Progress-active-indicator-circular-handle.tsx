import {AnimatedTiming} from '../../../hooks'
import {HandleProgressActiveIndicatorCircularAnimatedTimingOptions} from './Progress-active-indicator-circular.interface'

export const handleProgressActiveIndicatorCircularAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        ({containerSharedValue, circleSharedValue}: HandleProgressActiveIndicatorCircularAnimatedTimingOptions) =>
        (value: number) => {
                animatedTiming({repeat: 0, duration: 2000, easing: 'linear'})(circleSharedValue)(value)
                animatedTiming({repeat: 0, duration: 2000, easing: 'linear'})(containerSharedValue)(value)
        }
