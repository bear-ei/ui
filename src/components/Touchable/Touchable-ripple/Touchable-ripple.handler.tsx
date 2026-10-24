import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../../hooks'
import type {
	AnimateTouchableRippleOptions,
	TouchableRippleProps,
	TouchableRippleState
} from './Touchable-ripple.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'

// Re-render the ripple when the container resizes so its center / radius
// stay accurate. Ripples are typically short-lived, so the extra renders
// are negligible — and if the button lives in a dynamic layout (collapsing
// panel, responsive sidebar), a stale position would be visibly wrong.
export const compareTouchableRippleProps = (prevProps: TouchableRippleProps, nextProps: TouchableRippleProps) => {
	const {
		containerLayout: prevContainerLayout,
		rippleCentered: isPrevRippleCentered,
		rippleKey: prevRippleKey,
		shape: prevShape,
		underlayColor: prevUnderlayColor
	} = prevProps

	const {
		containerLayout: nextContainerLayout,
		rippleCentered: isNextRippleCentered,
		rippleKey: nextRippleKey,
		shape: nextShape,
		underlayColor: nextUnderlayColor
	} = nextProps

	return ![
		prevRippleKey !== nextRippleKey,
		prevContainerLayout?.width !== nextContainerLayout?.width,
		prevContainerLayout?.height !== nextContainerLayout?.height,
		isPrevRippleCentered !== isNextRippleCentered,
		prevShape !== nextShape,
		prevUnderlayColor !== nextUnderlayColor
	].some(Boolean)
}

export const handleTouchableRippleStateChange = (
	_event: InteractionEvent,
	setState: Updater<TouchableRippleState>,
	{eventName}: HandleInteractionStateChangeOptions
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
	animatedTiming: AnimatedTimingFactory,
	{onAnimationFinished, rippleKey}: AnimateTouchableRippleOptions
) => {
	const entryAnimateSharedValueTo = animatedTiming(scaleSharedValue, ANIMATED_TIMING.ENTER)

	const exitAnimateSharedValueTo = animatedTiming(opacitySharedValue, {
		...ANIMATED_TIMING.FADE_OUT,
		delay: 75,
		onFinish: (finished?: boolean) => finished && rippleKey && onAnimationFinished?.(rippleKey)
	})

	return () => {
		entryAnimateSharedValueTo(1)
		exitAnimateSharedValueTo(0)
	}
}
