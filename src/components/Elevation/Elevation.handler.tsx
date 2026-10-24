import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory} from '../../hooks'
import type {
	AnimateElevationOptions,
	ElevationState,
	ElevationValue,
	GetWebBoxShadowOptions
} from './Elevation.interface'

import {COMPONENT_STATUS} from '../../constants'
import {ANIMATED_TIMING, EASING, hexToRGBA} from '../../theme'
import {toPlatformUnit} from '../../utils'

export const getWebBoxShadow = ({blurRadius, color, offsetX, offsetY, opacity}: GetWebBoxShadowOptions) => {
	const shadowColor = hexToRGBA(color, opacity)

	return [
		{
			blurRadius: toPlatformUnit(blurRadius),
			color: shadowColor,
			offsetX: toPlatformUnit(offsetX),
			offsetY: toPlatformUnit(offsetY)
		},
		{
			blurRadius: toPlatformUnit(blurRadius * 0.75),
			color: shadowColor,
			offsetX: toPlatformUnit(offsetX * 0.66),
			offsetY: toPlatformUnit(offsetY * 0.66)
		},
		{
			blurRadius: toPlatformUnit(blurRadius * 0.5),
			color: shadowColor,
			offsetX: toPlatformUnit(offsetX * 0.33),
			offsetY: toPlatformUnit(offsetY * 0.33)
		}
	]
}

export const updateElevationLevel = (setState: Updater<ElevationState>) => (level?: ElevationValue) => {
	if (typeof level !== 'number') {
		return
	}

	setState(draft => {
		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}

		if (draft.level === level) {
			return
		}

		draft.level = level
	})
}

/**
 * Build an `animate(level)` function that drives the shadow SharedValue.
 *
 * **Two modes, selected by whether `entry` is provided:**
 *
 * 1. **Visibility mode** (`entry` present):
 *    - `level !== 0` → runs the ENTRY animation (decelerate easing)
 *    - `level === 0` → runs the EXIT animation (accelerate easing)
 *    Used when the component appears/disappears via a boolean-like signal.
 *
 * 2. **Transition mode** (`entry` absent):
 *    - Any `level` change runs the same standard animation.
 *    Used when the level is a continuous state (e.g. hover elevation).
 *
 * **`onAnimationFinished` argument differs per branch:**
 *    - entry → `onAnimationFinished(true)`  (became visible)
 *    - exit  → `onAnimationFinished(false)` (became hidden)
 *    - plain → `onAnimationFinished()`      (no direction — level change)
 *
 * ⚠️ A `false` from Reanimated means the animation was interrupted
 * (superseded by a newer call). This wrapper filters those out via
 * `finished && …`, so consumers only see successful completions.
 */
export const animateElevation = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory,
	{entry, exit, onAnimationFinished}: AnimateElevationOptions
) => {
	const entryAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_DECELERATE,
		...entry,
		onFinish: (finished?: boolean) => finished && onAnimationFinished?.(true)
	})

	const exitAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_ACCELERATE,
		...exit,
		onFinish: (finished?: boolean) => finished && onAnimationFinished?.(false)
	})

	const animateSharedValueTo = animatedTiming(sharedValue, {
		...ANIMATED_TIMING.STANDARD,
		onFinish: (finished?: boolean) => finished && onAnimationFinished?.()
	})

	return (level: ElevationValue) => {
		if (entry) {
			const runAnimateSharedValueTo = level !== 0 ? entryAnimateSharedValueTo : exitAnimateSharedValueTo

			runAnimateSharedValueTo(level)

			return
		}

		animateSharedValueTo(level)
	}
}
