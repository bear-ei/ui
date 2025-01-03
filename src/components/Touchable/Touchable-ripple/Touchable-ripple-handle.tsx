import {
        HandleTouchableRippleAnimatedTimingOptions,
        HandleTouchableRippleAnimatedTimingSharedValue
} from './Touchable-ripple.interface'

export const handleTouchableRippleAnimatedTiming = ({
        animatedTiming,
        onAnimatedFinished
}: HandleTouchableRippleAnimatedTimingOptions) => {
        const handleAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
        const createTouchableRippleAnimatedTiming =
                ({opacitySharedValue, scaleSharedValue}: HandleTouchableRippleAnimatedTimingSharedValue) =>
                (toValue: number) =>
                (callback?: () => void) =>
                        animatedTiming({callback: handleAnimatedTimingCallback(callback)})(
                                toValue === 1 ? scaleSharedValue : opacitySharedValue
                        )(toValue)

        return (sharedValue: HandleTouchableRippleAnimatedTimingSharedValue) => (index: string) => {
                const entryAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(1)
                const exitAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(0)
                const exitAnimatedFinished = () => onAnimatedFinished?.(index)

                entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
        }
}
