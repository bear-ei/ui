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
	({animatedTiming, onAnimationFinished}: AnimateElevationOptions) =>
	(shadowSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({
			callback: (finished?: boolean) => finished && onAnimationFinished?.(),
			duration: DURATION.MEDIUM_0,
			easing: EASING.STANDARD
		})({sharedValue: shadowSharedValue})

		return (level: ElevationValue) => animateSharedValueTo(level)
	}
