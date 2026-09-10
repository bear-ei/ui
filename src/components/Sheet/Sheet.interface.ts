import type {CommonProps} from '@/constants'
import type {RefAttributes} from 'react'
import type {ModalProps, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
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
	primaryButton?: React.JSX.Element
	secondaryButton?: React.JSX.Element
	position?: SheetPosition
	visible?: boolean

	/**
	 * The modal type has a problem with mouseover events being passed through to lower level
	 * elements in macOS. This problem is caused by the fact that react-native-macos does not
	 * implement the native modal and some of the mechanisms of the macos component itself.
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
	nextCancelEvent?: () => void
	nextCloseEvent?: () => void
	sheetVisible?: boolean
}

export type UpdateSheetBackWithEventOptions = Pick<SheetBaseProps, 'type' | 'disabledClose' | 'onBack'>
export type EmitSheetModalOptions = Pick<SheetBaseProps, 'visible' | 'id' | 'type'>
