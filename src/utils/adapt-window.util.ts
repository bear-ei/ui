import {PixelRatio, Platform} from 'react-native'
import {AdaptDesignOptions, AdaptWindowOptions} from './utils.interface'

export const adaptWindow =
        ({screenWidth = 1125, screenHeight = 2436}: AdaptWindowOptions = {}) =>
        ({designWidth = 375, designHeight = 812, designDensity = 3}: AdaptDesignOptions = {}) => {
                const fontScale = PixelRatio.getFontScale()
                const heightScale = screenHeight / (designHeight / designDensity)
                const widthScale = screenWidth / (designWidth / designDensity)
                const scale = Math.min(widthScale, heightScale)

                return () => {
                        const desktop = ['macos', 'windows', 'web'].includes(Platform.OS)

                        if (desktop) {
                                return {
                                        adaptFontSize: (size: number) => size,
                                        adaptSize: (size: number) => size
                                }
                        }

                        return {
                                adaptFontSize: (size: number) => Math.round(size * scale * fontScale),
                                adaptSize: (size: number) => Math.round(size * scale)
                        }
                }
        }
