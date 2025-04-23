import {PixelRatio} from 'react-native'
import type {AdaptDesignOptions, AdaptWindowOptions} from './utils.interface'

export const adaptWindow =
	({screenWidth = 1125, screenHeight = 2436}: AdaptWindowOptions = {}) =>
	({designWidth = 375, designHeight = 812, designDensity = 3}: AdaptDesignOptions = {}) => {
		const fontScale = PixelRatio.getFontScale()
		const heightScale = screenHeight / (designHeight / designDensity)
		const widthScale = screenWidth / (designWidth / designDensity)
		const scale = Math.min(widthScale, heightScale)

		return (desktop?: boolean) => {
			if (desktop) {
				return {
					adaptFontSize: (size: number) => Math.max(0, size),
					adaptSize: (size: number) => Math.max(0, size)
				}
			}

			return {
				adaptFontSize: (size: number) => Math.max(0, Math.round(size * scale * fontScale)),
				adaptSize: (size: number) => Math.max(0, Math.round(size * scale))
			}
		}
	}
