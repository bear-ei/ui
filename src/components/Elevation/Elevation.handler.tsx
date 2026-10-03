import type {SharedValue} from 'react-native-reanimated'
import {hexToRGBA, platformValue} from '../../utils'
import type {
	AnimateElevationOptions,
	ElevationLevel,
	ElevationState,
	GetWebBoxShadowOptions
} from './Elevation.interface'
import {DURATION, EASING} from '../../theme'
import type {Updater} from 'use-immer'
import {ELEVATION_ACTION} from './Elevation.enum'
import {COMPONENT_STATUS} from '../../constants'

export const getWebBoxShadow = ({offsetX, offsetY, radius, opacity, color}: GetWebBoxShadowOptions) => {
	const r = Math.max(1, radius)
	const shadowColor = hexToRGBA(color)(opacity)
	const x = Math.max(1, offsetX)
	const y = Math.max(1, offsetY)

	return [
		{offsetX: platformValue(x), offsetY: platformValue(y), blurRadius: platformValue(r), color: shadowColor},
		{
			blurRadius: platformValue(r * 0.75),
			color: shadowColor,
			offsetX: platformValue(x * 0.66),
			offsetY: platformValue(y * 0.66)
		},
		{
			blurRadius: platformValue(r * 0.5),
			color: shadowColor,
			offsetX: platformValue(x * 0.33),
			offsetY: platformValue(y * 0.33)
		}
	]
}

export const updateElevationLevel = (setState: Updater<ElevationState>) => (level?: ElevationLevel) =>
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
	(level: ElevationLevel) =>
		animatedTiming({
			callback: (finished?: boolean) => finished && onAnimationFinished?.(level),
			duration: DURATION.MEDIUM_0,
			easing: action === ELEVATION_ACTION.FALL ? EASING.STANDARD_ACCELERATE : EASING.STANDARD_DECELERATE
		})({
			sharedValue: shadowSharedValue
		})(level)
