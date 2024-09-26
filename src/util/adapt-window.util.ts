import {PixelRatio} from 'react-native'
import {AdaptDesignOptions, AdaptWindowOptions} from './util.interface'

export const adaptWindow =
    ({screenWidth = 0, screenHeight = 0}: AdaptWindowOptions = {}) =>
    ({designWidth = 750, designHeight = 1334, designDensity = 2}: AdaptDesignOptions = {}) => {
        const fontScale = PixelRatio.getFontScale()
        const heightScale = screenHeight / (designHeight / designDensity)
        const widthScale = screenWidth / (designWidth / designDensity)
        const scale = Math.min(widthScale, heightScale)

        return (desktopDevice = false) => {
            if (desktopDevice) {
                return {adaptFontSize: (size: number) => size, adaptSize: (size: number) => size}
            }

            return {
                adaptFontSize: (size: number) => Math.round(size * scale * fontScale),
                adaptSize: (size: number) => Math.round(size * scale)
            }
        }
    }
