import type {AnimateSharedValueTo} from '@/hooks'
import type {SharedValue} from 'react-native-reanimated'

export const animateSupportingText =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (supportingTextSharedValue: SharedValue<number>) =>
        (value: number) =>
                animateSharedValueTo({sharedValue: supportingTextSharedValue})(value)
