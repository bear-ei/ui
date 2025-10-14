import {AnimateSharedValueTo} from '@/hooks'
import {platformValue} from '@/utils'
import {hexToRGBA} from '@bearei/theme-token'
import type {SharedValue} from 'react-native-reanimated'
import type {GetWebBoxShadowOptions} from './Elevation.interface'

export const getWebBoxShadow = ({offsetX, offsetY, radius, opacity, color}: GetWebBoxShadowOptions): string => {
        const r = Math.max(1, radius)
        const shadowColor = hexToRGBA(color)(opacity)
        const x = Math.max(1, offsetX)
        const y = Math.max(1, offsetY)

        return [
                `${platformValue(x)} ${platformValue(y)} ${platformValue(r)} ${shadowColor}`,
                `${platformValue(x * 0.66)} ${platformValue(y * 0.66)} ${platformValue(r * 0.75)} ${shadowColor}`,
                `${platformValue(x * 0.33)} ${platformValue(y * 0.33)} ${platformValue(r * 0.5)} ${shadowColor}`
        ].join(', ')
}

export const animateElevation =
        (animateSharedValueTo: AnimateSharedValueTo) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
                animateSharedValueTo({sharedValue: shadowSharedValue})(level)
