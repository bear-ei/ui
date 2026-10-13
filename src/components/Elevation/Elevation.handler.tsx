import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../../constants'
import {DURATION, EASING, hexToRGBA, platformValue} from '../../theme'
import type {
	AnimateElevationOptions,
	ElevationState,
	ElevationValue,
	GetWebBoxShadowOptions
} from './Elevation.interface'

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

export const updateElevationLevel = (setState: Updater<ElevationState>) => (level?: ElevationValue) =>
	typeof level === 'number' &&
	setState(draft => {
		draft.level = level

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

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
