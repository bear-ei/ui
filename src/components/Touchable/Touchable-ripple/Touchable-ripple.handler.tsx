import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {
	AnimateTouchableRippleOptions,
	TouchableRippleProps,
	TouchableRippleState
} from './Touchable-ripple.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {DURATION, EASING} from '../../../theme'

// Re-render the ripple when the container resizes so its center / radius
// stay accurate. Ripples are typically short-lived, so the extra renders
// are negligible — and if the button lives in a dynamic layout (collapsing
// panel, responsive sidebar), a stale position would be visibly wrong.
export const compareTouchableRippleProps = (prevProps: TouchableRippleProps, nextProps: TouchableRippleProps) => {
	const {
		centered: isPrevCentered,
		containerLayout: prevContainerLayout,
		indexKey: prevIndexKey,
		shape: prevShape,
		underlayColor: prevUnderlayColor
	} = prevProps

	const {
		centered: isNextPrevCentered,
		containerLayout: nextContainerLayout,
		indexKey: nextIndexKey,
		shape: nextShape,
		underlayColor: nextUnderlayColor
	} = nextProps

	return ![
		prevIndexKey !== nextIndexKey,
		prevContainerLayout?.width !== nextContainerLayout?.width,
		prevContainerLayout?.height !== nextContainerLayout?.height,
		isPrevCentered !== isNextPrevCentered,
		prevShape !== nextShape,
		prevUnderlayColor !== nextUnderlayColor
	].some(Boolean)
}

export const handleTouchableRippleStateChange = (
	_event: StateEvent,
	setState: Updater<TouchableRippleState>,
	{eventName}: HandleStateEventChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
}

export const animateTouchableRipple = (
	[opacitySharedValue, scaleSharedValue]: [SharedValue<number>, SharedValue<number>],
	{animatedTiming, indexKey, onAnimateFinished}: AnimateTouchableRippleOptions
) => {
	const entryAnimateSharedValueTo = animatedTiming(scaleSharedValue, {
		duration: DURATION.SHORT_2,
		easing: EASING.STANDARD_DECELERATE
	})

	const exitAnimateSharedValueTo = animatedTiming(opacitySharedValue, {
		callback: (finished?: boolean) => finished && indexKey && onAnimateFinished?.(indexKey),
		delay: 75,
		duration: DURATION.SHORT_3,
		easing: EASING.STANDARD_ACCELERATE
	})

	return () => {
		entryAnimateSharedValueTo(1)
		exitAnimateSharedValueTo(0)
	}
}
