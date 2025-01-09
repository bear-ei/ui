import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {
        HandleSideSheetContentLeadingOptions,
        HandleSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const handleSideSheetContentLeading =
        ({headlineLeading, back, sheetPosition}: HandleSideSheetContentLeadingOptions) =>
        (onBack?: () => void) =>
                headlineLeading ??
                (back ?
                        <IconButton
                                icon={
                                        <Icon
                                                iconStyle='rounded'
                                                name={
                                                        sheetPosition === 'horizontalStart' ? 'arrowForward' : (
                                                                'arrowBack'
                                                        )
                                                }
                                                type='filled'
                                        />
                                }
                                onPressOut={onBack}
                                type='standard'
                        />
                :       undefined)

export const handleSideSheetContentTrailing =
        ({headlineTrailing, close}: HandleSideSheetContentTrailingOptions) =>
        (onClose?: () => void) =>
                headlineTrailing ??
                (close ?
                        <IconButton
                                icon={
                                        <Icon
                                                iconStyle='rounded'
                                                name='close'
                                                type='filled'
                                        />
                                }
                                onPressOut={onClose}
                                type='standard'
                        />
                :       undefined)

export const handleSideSheetContentVisibleAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (backgroundColorSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (typeof visible !== 'boolean') {
                        return
                }

                const toValue = visible ? 1 : 0

                animatedTiming()(backgroundColorSharedValue)(toValue)
        }
