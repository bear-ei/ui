import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {Icon, IconName, IconStyle, IconType} from '../../Icon'
import {IconButton, IconButtonType} from '../../Icon-button'
import {SheetPosition} from '../Side-sheet.enum'
import {
        RenderSideSheetContentLeadingOptions,
        RenderSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const renderSideSheetContentLeading =
        ({headlineLeading, back, sheetPosition, id}: RenderSideSheetContentLeadingOptions) =>
        (onBack?: () => void) => {
                const iconName =
                        sheetPosition === SheetPosition.HORIZONTAL_START ? IconName.ARROW_FORWARD : IconName.ARROW_BACK

                const iconElement = (
                        <Icon
                                iconStyle={IconStyle.ROUNDED}
                                name={iconName}
                                testID={`sideSheet__iconForward--${id}`}
                                type={IconType.FILLED}
                        />
                )

                return (
                        headlineLeading ??
                        (back ?
                                <IconButton
                                        icon={iconElement}
                                        onPressOut={onBack}
                                        testID={`sideSheet__iconButton--${id}`}
                                        type={IconButtonType.STANDARD}
                                />
                        :       undefined)
                )
        }

export const renderSideSheetContentTrailing =
        ({headlineTrailing, close, id}: RenderSideSheetContentTrailingOptions) =>
        (onClose?: () => void) => {
                const iconElement = (
                        <Icon
                                iconStyle={IconStyle.ROUNDED}
                                name={IconName.CLOSE}
                                testID={`sideSheet__iconClose--${id}`}
                                type={IconType.FILLED}
                        />
                )

                return (
                        headlineTrailing ??
                        (close ?
                                <IconButton
                                        icon={iconElement}
                                        onPressOut={onClose}
                                        testID={`sideSheet__iconButton--${id}`}
                                        type={IconButtonType.STANDARD}
                                />
                        :       undefined)
                )
        }

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
