import {AnimateSharedValueTo} from '@/hooks'
import type {SharedValue} from 'react-native-reanimated'

export const animateSheetContent =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (backgroundColorSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (typeof visible !== 'boolean') {
                        return
                }

                const toValue = visible ? 1 : 0

                animateSharedValueTo({sharedValue: backgroundColorSharedValue})(toValue)
        }
