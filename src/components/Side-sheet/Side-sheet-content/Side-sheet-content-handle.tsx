import {SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {SheetPosition} from '../Side-sheet.enum'
import {
	RenderSideSheetContentLeadingOptions,
	RenderSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const renderSideSheetContentLeading =
	({headlineLeading, back, sheetPosition, id}: RenderSideSheetContentLeadingOptions) =>
	(onBack?: () => void) => {
		const iconName =
			sheetPosition === SheetPosition.HORIZONTAL_START ?
				ICON_NAME.ARROW_FORWARD
			:	ICON_NAME.ARROW_BACK

		const iconElement = (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={iconName}
				testID={`sideSheet__iconForward--${id}`}
				type={ICON_TYPE.FILLED}
			/>
		)

		return (
			headlineLeading ??
			(back ?
				<IconButton
					icon={iconElement}
					onPressOut={onBack}
					testID={`sideSheet__iconButton--${id}`}
					type={IconBUTTON_TYPE.STANDARD}
				/>
			:	undefined)
		)
	}

export const renderSideSheetContentTrailing =
	({headlineTrailing, close, id}: RenderSideSheetContentTrailingOptions) =>
	(onClose?: () => void) => {
		const iconElement = (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={ICON_NAME.CLOSE}
				testID={`sideSheet__iconClose--${id}`}
				type={ICON_TYPE.FILLED}
			/>
		)

		return (
			headlineTrailing ??
			(close ?
				<IconButton
					icon={iconElement}
					onPressOut={onClose}
					testID={`sideSheet__iconButton--${id}`}
					type={IconBUTTON_TYPE.STANDARD}
				/>
			:	undefined)
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
