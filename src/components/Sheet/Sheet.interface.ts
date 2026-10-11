import type {RefAttributes} from 'react'
import type {ModalProps, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {CommonProps} from '../../constants'
import type {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from './Sheet.enum'

export type SheetType = (typeof SIDE_SHEET_TYPE)[keyof typeof SIDE_SHEET_TYPE]
export type SheetPosition = (typeof SIDE_SHEET_POSITION)[keyof typeof SIDE_SHEET_POSITION]
export interface SheetProps extends ViewProps, RefAttributes<View>, CommonProps, ModalProps {
	back?: boolean
	close?: boolean
	content?: React.JSX.Element
	defaultVisible?: boolean
	disabledClose?: boolean
	footerVisible?: boolean
	headlineLeading?: React.JSX.Element
	headlineText?: string
	headlineTrailing?: React.JSX.Element
	onBack?: () => void
	onCancel?: () => void
	onClose?: () => void
	onConfirm?: () => void

	/**
	 * FIXME: Unable to trigger callbacks properly
	 */
	onVisible?: (visible?: boolean) => void
	position?: SheetPosition
	primaryButton?: React.JSX.Element
	secondaryButton?: React.JSX.Element

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

export interface RenderSheetProps extends SheetProps {
	onVisibleSource?: () => void
}

export type SheetBaseProps = SheetProps
export interface SheetState {
	nextBackEvent?: () => void
	nextCloseEvent?: () => void
	sheetVisible?: boolean
}

export type UpdateSheetBackWithEventOptions = Pick<SheetBaseProps, 'type' | 'disabledClose' | 'onBack'>
export type EmitSheetModalOptions = Pick<SheetBaseProps, 'visible' | 'id' | 'type'>
