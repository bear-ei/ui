import {AnimateSharedValueTo} from '@/hooks'
import {hexToRGBA, pxToRem} from '@bearei/theme-token'
import type {SharedValue} from 'react-native-reanimated'
import type {GetWebBoxShadowOptions} from './Elevation.interface'

export const getWebBoxShadow = ({offsetX, offsetY, radius, opacity, color}: GetWebBoxShadowOptions): string => {
        const r = Math.max(1, radius)
        const shadowColor = hexToRGBA(color)(opacity)
        const x = Math.max(1, offsetX)
        const y = Math.max(1, offsetY)

        return [
                `${pxToRem()(x)}rem ${pxToRem()(y)}rem ${pxToRem()(r)}rem ${shadowColor}`,
                `${pxToRem()(x * 0.66)}rem ${pxToRem()(y * 0.66)}rem ${pxToRem()(r * 0.75)}rem ${shadowColor}`,
                `${pxToRem()(x * 0.33)}rem ${pxToRem()(y * 0.33)}rem ${pxToRem()(r * 0.5)}rem ${shadowColor}`
        ].join(', ')
}

export const animateElevation =
        (animateSharedValueTo: AnimateSharedValueTo) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
                animateSharedValueTo({sharedValue: shadowSharedValue})(level)
