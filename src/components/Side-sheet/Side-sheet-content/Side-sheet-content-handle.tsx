import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {
        RenderSideSheetContentLeadingOptions,
        RenderSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const renderSideSheetContentLeading =
        ({headlineLeading, back, sheetPosition, id}: RenderSideSheetContentLeadingOptions) =>
        (onBack?: () => void) =>
                headlineLeading ??
                (back ?
                        <IconButton
                                icon={
                                        <Icon
                                                iconStyle={IconStyle.ROUNDED}
                                                name={
                                                        sheetPosition === 'horizontalStart' ? 'arrowForward' : (
                                                                'arrowBack'
                                                        )
                                                }
                                                testID={`sideSheet__iconForward--${id}`}
                                                type='filled'
                                        />
                                }
                                onPressOut={onBack}
                                testID={`sideSheet__iconButton--${id}`}
                                type='standard'
                        />
                :       undefined)

export const renderSideSheetContentTrailing =
        ({headlineTrailing, close, id}: RenderSideSheetContentTrailingOptions) =>
        (onClose?: () => void) =>
                headlineTrailing ??
                (close ?
                        <IconButton
                                icon={
                                        <Icon
                                                iconStyle={IconStyle.ROUNDED}
                                                name='close'
                                                testID={`sideSheet__iconClose--${id}`}
                                                type='filled'
                                        />
                                }
                                onPressOut={onClose}
                                testID={`sideSheet__iconButton--${id}`}
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
