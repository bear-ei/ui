import {hexToRGBA} from '@bearei/element-token'
import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../hooks'
import type {GetWebBoxShadowOptions} from './Elevation.interface'

export const getWebBoxShadow = ({offsetX, offsetY, radius, opacity, color}: GetWebBoxShadowOptions): string => {
	const r = Math.max(1, radius)
	const shadowColor = hexToRGBA(color)(opacity)
	const x = Math.max(1, offsetX)
	const y = Math.max(1, offsetY)

	return [
		`${x}px ${y}px ${r}px ${shadowColor}`,
		`${x * 0.66}px ${y * 0.66}px ${r * 0.75}px ${shadowColor}`,
		`${x * 0.33}px ${y * 0.33}px ${r * 0.5}px ${shadowColor}`
	].join(', ')
}

export const animateElevation =
	(animateSharedValueTo: AnimateSharedValueTo) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
		animateSharedValueTo({sharedValue: shadowSharedValue})(level)
