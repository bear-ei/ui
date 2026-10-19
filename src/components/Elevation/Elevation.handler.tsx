import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../../constants'
import {DURATION, EASING, hexToRGBA} from '../../theme'
import type {
	AnimateElevationOptions,
	ElevationState,
	ElevationValue,
	GetWebBoxShadowOptions
} from './Elevation.interface'
import {platformValue} from '../../utils'

export const getWebBoxShadow = ({offsetX, offsetY, blurRadius, opacity, color}: GetWebBoxShadowOptions) => {
	const shadowColor = hexToRGBA(color)(opacity)

	return [
		{
			blurRadius: platformValue(blurRadius),
			color: shadowColor,
			offsetX: platformValue(offsetX),
			offsetY: platformValue(offsetY)
		},
		{
			blurRadius: platformValue(blurRadius * 0.75),
			color: shadowColor,
			offsetX: platformValue(offsetX * 0.66),
			offsetY: platformValue(offsetY * 0.66)
		},
		{
			blurRadius: platformValue(blurRadius * 0.5),
			color: shadowColor,
			offsetX: platformValue(offsetX * 0.33),
			offsetY: platformValue(offsetY * 0.33)
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
export const animateElevation =
	({animatedTiming, onAnimationFinished, entry, exit}: AnimateElevationOptions) =>
	(shadowSharedValue: SharedValue<number>) => {
		const entryAnimateSharedValueTo = animatedTiming({
			easing: EASING.STANDARD_DECELERATE,
			...entry,
			callback: (finished?: boolean) => finished && onAnimationFinished?.(true)
		})({sharedValue: shadowSharedValue})

		const exitAnimateSharedValueTo = animatedTiming({
			easing: EASING.STANDARD_ACCELERATE,
			...exit,
			callback: (finished?: boolean) => finished && onAnimationFinished?.(false)
		})({sharedValue: shadowSharedValue})

		const animateSharedValueTo = animatedTiming({
			callback: (finished?: boolean) => finished && onAnimationFinished?.(),
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD
		})({sharedValue: shadowSharedValue})

		return (level: ElevationValue) => {
			if (entry) {
				const runAnimateSharedValueTo = level !== 0 ? entryAnimateSharedValueTo : exitAnimateSharedValueTo

				runAnimateSharedValueTo(level)

				return
			}

			animateSharedValueTo(level)
		}
	}
