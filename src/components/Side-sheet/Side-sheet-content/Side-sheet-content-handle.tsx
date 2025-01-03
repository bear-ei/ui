import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {
        HandleSideSheetContentLeadingOptions,
        HandleSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const handleSideSheetContentLeading =
        ({headlineLeading, back, sheetPosition, id}: HandleSideSheetContentLeadingOptions) =>
        (onBack?: () => void) =>
                headlineLeading ??
                (back ?
                        <IconButton
                                testID={`sideSheetContent__iconButton--${id}`}
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
        ({headlineTrailing, close, id}: HandleSideSheetContentTrailingOptions) =>
        (onClose?: () => void) =>
                headlineTrailing ??
                (close ?
                        <IconButton
                                testID={`sideSheetContent__iconButton--${id}`}
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

export const handleSideSheetContentFooterVisibleAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (footerSharedValue: SharedValue<number>) => (footerVisible?: boolean) => {
                if (typeof footerVisible === 'boolean') {
                        animatedTiming({
                                duration: footerVisible ? 'medium3' : 'short3',
                                easing: footerVisible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
                        })(footerSharedValue)(footerVisible ? 1 : 0)
                }
        }
