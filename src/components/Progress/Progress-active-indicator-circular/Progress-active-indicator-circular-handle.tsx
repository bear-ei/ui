import {Easing} from '@bearei/material-token'
import {AnimatedTiming} from '../../../hooks'
import {HandleProgressActiveIndicatorCircularAnimatedTimingOptions} from './Progress-active-indicator-circular.interface'

export const handleProgressActiveIndicatorCircularAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        ({containerSharedValue, circleSharedValue}: HandleProgressActiveIndicatorCircularAnimatedTimingOptions) =>
        (value: number) => {
                animatedTiming({repeat: 0, duration: 2000, easing: Easing.LINEAR})(circleSharedValue)(value)
                animatedTiming({repeat: 0, duration: 2000, easing: Easing.LINEAR})(containerSharedValue)(value)
        }

export const handleProgressActiveIndicatorCircularStrokeDashoffset = (circumference: number) => (value: number) =>
        circumference * (1 - value)
