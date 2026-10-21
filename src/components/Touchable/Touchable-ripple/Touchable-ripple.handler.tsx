import type {Updater} from 'use-immer'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'

import type {
	AnimateTouchableRippleOptions,
	AnimateTouchableRippleSharedValues,
	TouchableRippleProps,
	TouchableRippleState
} from './Touchable-ripple.interface'

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

export const handleTouchableRippleStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<TouchableRippleState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})

export const animateTouchableRipple =
	({animatedTiming, onAnimateFinished, indexKey}: AnimateTouchableRippleOptions) =>
	({opacitySharedValue, scaleSharedValue}: AnimateTouchableRippleSharedValues) => {
		const entryAnimateSharedValueTo = animatedTiming({
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD_DECELERATE
		})({sharedValue: scaleSharedValue})

		const exitAnimateSharedValueTo = animatedTiming({
			delay: 75,
			duration: DURATION.SHORT_3,
			easing: EASING.STANDARD_ACCELERATE,
			callback: (finished?: boolean) => finished && indexKey && onAnimateFinished?.(indexKey)
		})({sharedValue: opacitySharedValue})

		return () => {
			entryAnimateSharedValueTo(1)
			exitAnimateSharedValueTo(0)
		}
	}
