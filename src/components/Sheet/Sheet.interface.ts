import type {JSX, RefAttributes} from 'react'
import type {ModalProps, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {ThemeProps} from '../../theme'
import type {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from './Sheet.enum'

export type SheetType = (typeof SIDE_SHEET_TYPE)[keyof typeof SIDE_SHEET_TYPE]
export type SheetPosition = (typeof SIDE_SHEET_POSITION)[keyof typeof SIDE_SHEET_POSITION]
export interface SheetProps
	extends
		ViewProps,
		RefAttributes<View>,
		ThemeProps,
		Omit<ModalProps, 'visible' | 'onRequestClose' | 'animationType' | 'transparent'> {
	back?: boolean
	close?: boolean
	content?: JSX.Element
	defaultVisible?: boolean
	disabledBack?: boolean
	footerVisible?: boolean
	headlineLeading?: JSX.Element
	headlineText?: string
	headlineTrailing?: JSX.Element
	onBack?: () => void
	onCancel?: () => void
	onClose?: () => void
	onConfirm?: () => void
	onVisible?: (visible?: boolean) => void
	position?: SheetPosition
	primaryButton?: JSX.Element
	secondaryButton?: JSX.Element

	/**
	 * The `type` parameter, used in MODAL mode, controls whether the modal layer is visible.
	 */
	visible?: boolean

	/**
	 * @remarks
	 *
	 * MODAL is under evaluation for removal.
	 * Design direction: avoid full-attention interrupts when possible.
	 * Prefer SIDEBAR + undivided main content.
	 */
	type?: SheetType
	primaryButtonDisabled?: boolean
	primaryButtonLabelText?: string
	primaryButtonLoading?: boolean
	primaryButtonStyle?: StyleProp<ViewStyle>
	secondaryButtonDisabled?: boolean
	secondaryButtonLabelText?: string
	secondaryButtonLoading?: boolean
	secondaryButtonStyle?: StyleProp<ViewStyle>
}

export type RenderSheetProps = SheetProps
export type SheetBaseProps = SheetProps
export interface SheetState {
	pendingCloseEvent?: boolean
	visible?: boolean
}

export type EmitSheetModalOptions = Pick<SheetBaseProps, 'visible' | 'id' | 'type'>
