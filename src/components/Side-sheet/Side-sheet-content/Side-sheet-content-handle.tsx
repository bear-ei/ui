import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../../hooks'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import type {
	RenderSideSheetContentLeadingOptions,
	RenderSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'

export const renderSideSheetContentLeading =
	({headlineLeading, back, position, id}: RenderSideSheetContentLeadingOptions) =>
	(onBack?: () => void) => {
		const iconName =
			position === SIDE_SHEET_POSITION.HORIZONTAL_START ?
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
					type={ICON_BUTTON_TYPE.STANDARD}
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
					type={ICON_BUTTON_TYPE.STANDARD}
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
