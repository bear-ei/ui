import type {
	AnimateTouchableRippleOptions,
	AnimateTouchableRippleSharedValues,
	TouchableRippleProps
} from './Touchable-ripple.interface'

export const compareTouchableRippleProps = (prevProps: TouchableRippleProps) => {
	const {indexKey: prevIndexKey} = prevProps

	return (nextProps: TouchableRippleProps) => {
		const {indexKey: nextIndexKey} = nextProps

		return ![prevIndexKey !== nextIndexKey].some(Boolean)
	}
}

export const animateTouchableRipple = ({animatedTiming, onAnimateFinished}: AnimateTouchableRippleOptions) => {
	const createAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
	const createRippleAnimatedTiming =
		({opacitySharedValue, scaleSharedValue}: AnimateTouchableRippleSharedValues) =>
		(toValue: number) =>
		(callback?: () => void) =>
			animatedTiming({callback: createAnimatedTimingCallback(callback)})(
				toValue === 1 ? scaleSharedValue : opacitySharedValue
			)(toValue)

	return (sharedValues: AnimateTouchableRippleSharedValues) => (index?: string) => {
		const entryAnimatedTiming = createRippleAnimatedTiming(sharedValues)(1)
		const exitAnimatedTiming = createRippleAnimatedTiming(sharedValues)(0)
		const exitAnimatedFinished = () => index && onAnimateFinished?.(index)

		entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
	}
}
