import {
	HandleTouchableRippleAnimatedTimingOptions,
	HandleTouchableRippleAnimatedTimingSharedValue,
	TouchableRippleProps
} from './Touchable-ripple.interface'

export const handleTouchableRipplePropsEqual = (prevProps: TouchableRippleProps) => {
	const {indexKey: prevIndexKey} = prevProps

	return (nextProps: TouchableRippleProps) => {
		const {indexKey: nextIndexKey} = nextProps

		return ![prevIndexKey !== nextIndexKey].some(Boolean)
	}
}

export const handleTouchableRippleAnimatedTiming = ({
	animatedTiming,
	onAnimatedFinished
}: HandleTouchableRippleAnimatedTimingOptions) => {
	const handleAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
	const handleRippleAnimatedTiming =
		({opacitySharedValue, scaleSharedValue}: HandleTouchableRippleAnimatedTimingSharedValue) =>
		(toValue: number) =>
		(callback?: () => void) =>
			animatedTiming({callback: handleAnimatedTimingCallback(callback)})(
				toValue === 1 ? scaleSharedValue : opacitySharedValue
			)(toValue)

	return (sharedValue: HandleTouchableRippleAnimatedTimingSharedValue) => (index: string) => {
		const entryAnimatedTiming = handleRippleAnimatedTiming(sharedValue)(1)
		const exitAnimatedTiming = handleRippleAnimatedTiming(sharedValue)(0)
		const exitAnimatedFinished = () => onAnimatedFinished?.(index)

		entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
	}
}
