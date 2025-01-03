import {RefAttributes} from 'react'
import {ButtonProps, ModalProps, View, ViewProps} from 'react-native'
import {ShapeProps} from '../Common'

export type SheetType = 'standard' | 'modal' | 'standardContainer'
export interface SideSheetProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'>, ModalProps {
        back?: boolean
        close?: boolean
        content?: JSX.Element
        defaultVisible?: boolean
        disabledClose?: boolean
        footerVisible?: boolean
        headlineLeading?: JSX.Element
        headlineText?: string
        headlineTrailing?: JSX.Element
        onBack?: () => void
        onCancel?: () => void
        onClose?: () => void
        onConfirm?: () => void
        onVisible?: (value?: boolean) => void
        primaryButton?: JSX.Element
        primaryButtonProps?: ButtonProps
        secondaryButton?: JSX.Element
        secondaryButtonProps?: ButtonProps
        sheetPosition?: 'horizontalStart' | 'horizontalEnd'
        visible?: boolean

        /**
         * The modal type has a problem with mouseover events being passed through to lower level
         * elements in macOS. This problem is caused by the fact that react-native-macos does not
         * implement the native modal and some of the mechanisms of the macos component itself.
         */
        type?: SheetType
}

export interface RenderSideSheetProps extends SideSheetProps {
        onVisibleSource?: () => void
}

export interface SideSheetBaseProps extends SideSheetProps {
        render: (props: RenderSideSheetProps) => JSX.Element
}

export interface SideSheetState {
        nextBackEvent?: () => void
        nextCancelEvent?: () => void
        nextCloseEvent?: () => void
        sideSheetVisible?: boolean
}

export type HandleSideSheetBackOptions = Pick<SideSheetBaseProps, 'type' | 'disabledClose' | 'onBack'>
export type HandleSideSheetEmitOptions = Pick<SideSheetBaseProps, 'visible' | 'id' | 'type'>
