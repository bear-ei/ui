import type {JSX, RefAttributes} from 'react'
import type {ModalProps, StyleProp, View, ViewProps, ViewStyle} from 'react-native'

import type {ThemeableProps} from '../../theme'
import type {SHEET_POSITION, SHEET_TYPE} from './Sheet.enum'

export type SheetType = (typeof SHEET_TYPE)[keyof typeof SHEET_TYPE]
export type SheetPosition = (typeof SHEET_POSITION)[keyof typeof SHEET_POSITION]
export interface SheetProps
	extends
		ViewProps,
		RefAttributes<View>,
		ThemeableProps,
		Omit<ModalProps, 'visible' | 'onRequestClose' | 'animationType' | 'transparent'> {
	backButtonDisabled?: boolean
	backButtonVisible?: boolean
	closeButtonVisible?: boolean
	content?: JSX.Element
	defaultVisible?: boolean
	footerVisible?: boolean
	headlineLeading?: JSX.Element
	headlineText?: string
	headlineTrailing?: JSX.Element
	onBack?: () => void
	onCancel?: () => void
	onClose?: () => void
	onConfirm?: () => void
	onVisibleChange?: (visible?: boolean) => void
	position?: SheetPosition
	primaryButton?: JSX.Element
	primaryButtonDisabled?: boolean
	primaryButtonLabelText?: string
	primaryButtonLoading?: boolean
	primaryButtonStyle?: StyleProp<ViewStyle>
	secondaryButton?: JSX.Element
	secondaryButtonDisabled?: boolean
	secondaryButtonLabelText?: string
	secondaryButtonLoading?: boolean
	secondaryButtonStyle?: StyleProp<ViewStyle>
	/**
	 * @remarks
	 *
	 * MODAL is under evaluation for removal.
	 * Design direction: avoid full-attention interrupts when possible.
	 * Prefer SIDEBAR + undivided main content.
	 */
	type?: SheetType
	/**
	 * The `type` parameter, used in MODAL mode, controls whether the modal layer is visible.
	 */
	visible?: boolean
}

export type RenderSheetProps = SheetProps
export type SheetBaseProps = SheetProps
export interface SheetState {
	pendingCloseEvent?: boolean
	visible?: boolean
}

export type EmitSheetModalOptions = Pick<SheetBaseProps, 'visible' | 'id' | 'type'>
