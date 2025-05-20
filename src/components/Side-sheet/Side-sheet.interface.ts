import type {RefAttributes} from 'react'
import type {ModalProps, View, ViewProps} from 'react-native'
import type {ButtonProps} from '../Button'
import type {ShapeProps} from '../Common'
import type {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from './Side-sheet.enum'

export type SideSheetType = (typeof SIDE_SHEET_TYPE)[keyof typeof SIDE_SHEET_TYPE]
export type SideSheetPosition = (typeof SIDE_SHEET_POSITION)[keyof typeof SIDE_SHEET_POSITION]
export interface SideSheetProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'>, ModalProps {
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
	primaryButtonProps?: ButtonProps
	secondaryButton?: React.JSX.Element
	secondaryButtonProps?: ButtonProps
	position?: SideSheetPosition
	visible?: boolean

	/**
	 * The modal type has a problem with mouseover events being passed through to lower level
	 * elements in macOS. This problem is caused by the fact that react-native-macos does not
	 * implement the native modal and some of the mechanisms of the macos component itself.
	 */
	type?: SideSheetType
}

export interface RenderSideSheetProps extends SideSheetProps {
	onVisibleSource?: () => void
}

export interface SideSheetBaseProps extends SideSheetProps {
	renderSideSheet: (props: RenderSideSheetProps) => React.JSX.Element
}

export interface SideSheetState {
	nextBackEvent?: () => void
	nextCancelEvent?: () => void
	nextCloseEvent?: () => void
	sideSheetVisible?: boolean
}

export type UpdateSideSheetBackWithEventOptions = Pick<SideSheetBaseProps, 'type' | 'disabledClose' | 'onBack'>
export type EmitSideSheetModalOptions = Pick<SideSheetBaseProps, 'visible' | 'id' | 'type'>
