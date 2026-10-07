import type {SharedValue} from 'react-native-reanimated'
import {hexToRGBA, platformValue} from '../../theme'
import type {
	AnimateElevationOptions,
	ElevationValue,
	ElevationState,
	GetWebBoxShadowOptions
} from './Elevation.interface'
import {DURATION, EASING} from '../../theme'
import type {Updater} from 'use-immer'
import {ELEVATION_ACTION} from './Elevation.enum'
import {COMPONENT_STATUS} from '../../constants'

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
		const currentLevel = draft.level ?? 0

		if (currentLevel !== level) {
			draft.action = currentLevel < level ? ELEVATION_ACTION.LIFT : ELEVATION_ACTION.FALL
		}

		draft.level = level

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const animateElevation =
	({animatedTiming, onAnimationFinished, action}: AnimateElevationOptions) =>
	(shadowSharedValue: SharedValue<number>) =>
	(level: ElevationValue) =>
		animatedTiming({
			callback: (finished?: boolean) => finished && onAnimationFinished?.(level),
			duration: DURATION.MEDIUM_0,
			easing: action === ELEVATION_ACTION.FALL ? EASING.STANDARD_ACCELERATE : EASING.STANDARD_DECELERATE
		})({
			sharedValue: shadowSharedValue
		})(level)
