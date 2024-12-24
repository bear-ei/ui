import {RefAttributes} from 'react'
import {ModalProps, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {ButtonProps} from '../../Button'
import {ShapeProps} from '../../Common'
import {SheetType} from '../Side-sheet.interface'

export interface SideSheetContentProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'>, ModalProps {
        back?: boolean
        close?: boolean
        content?: JSX.Element
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

export interface RenderSideSheetContentProps extends SideSheetContentProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        footerAnimatedStyle: AnimatedStyle<ViewStyle>
        leading?: JSX.Element
        trailing?: JSX.Element
}

export interface SideSheetContentBaseProps extends SideSheetContentProps {
        render: (props: RenderSideSheetContentProps) => JSX.Element
}

export type HandleSheetWasVisibleOptions = Pick<SideSheetContentProps, 'onVisible'>
export type UseSideSheetContentAnimatedOptions = Pick<RenderSideSheetContentProps, 'visible' | 'type' | 'footerVisible'>
export type RenderSideSheetContentLeadingOptions = Pick<
        SideSheetContentProps,
        'headlineLeading' | 'back' | 'sheetPosition'
>

export type RenderSideSheetContentTrailingOptions = Pick<SideSheetContentProps, 'headlineTrailing' | 'close'>
export type SheetContainerProps = Pick<RenderSideSheetContentProps, 'sheetPosition' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean}
export type SheetViewContentProps = Pick<RenderSideSheetContentProps, 'type'>
export type SheetFooterProps = Pick<RenderSideSheetContentProps, 'type'>
