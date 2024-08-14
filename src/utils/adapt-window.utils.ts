import {PixelRatio} from 'react-native'
import {AdaptDesignOptions, AdaptWindowOptions} from './utils.interface'

export const adaptWindow =
    ({screenWidth = 0, screenHeight = 0}: AdaptWindowOptions = {}) =>
    ({designWidth = 750, designHeight = 1334, designDensity = 2}: AdaptDesignOptions = {}) =>
    (desktopDevice = false) => {
        if (desktopDevice) {
            return {adaptFontSize: (size: number) => size, adaptSize: (size: number) => size}
        }

        const fontScale = PixelRatio.getFontScale()
        const heightScale = screenHeight / (designHeight / designDensity)
        const widthScale = screenWidth / (designWidth / designDensity)
        const scale = Math.min(widthScale, heightScale)

        return {
            adaptFontSize: (size: number) => Math.round(size * scale * fontScale),
            adaptSize: (size: number) => Math.round(size * scale)
        }
    }
