import type {
	CreateTouchableRippleAnimatedTimingSharedValue,
	HandleTouchableRippleAnimatedTimingOptions,
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
	const createAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
	const createRippleAnimatedTiming =
		({opacitySharedValue, scaleSharedValue}: CreateTouchableRippleAnimatedTimingSharedValue) =>
		(toValue: number) =>
		(callback?: () => void) =>
			animatedTiming({callback: createAnimatedTimingCallback(callback)})(
				toValue === 1 ? scaleSharedValue : opacitySharedValue
			)(toValue)

	return (sharedValue: CreateTouchableRippleAnimatedTimingSharedValue) => (index?: string) => {
		const entryAnimatedTiming = createRippleAnimatedTiming(sharedValue)(1)
		const exitAnimatedTiming = createRippleAnimatedTiming(sharedValue)(0)
		const exitAnimatedFinished = () => index && onAnimatedFinished?.(index)

		entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
	}
}
