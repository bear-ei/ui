import {RefAttributes} from 'react'
import {ModalProps, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {ButtonProps} from '../../Button'
import {ShapeProps} from '../../Common'
import {SheetType} from '../Side-sheet.interface'

export interface SideSheetContentProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'>, ModalProps {
    back?: boolean
    close?: boolean
    content?: React.JSX.Element
    densityScale?: number
    disabledClose?: boolean
    footerVisible?: boolean
    headlineLeading?: React.JSX.Element
    headlineText?: string
    headlineTrailing?: React.JSX.Element
    onCancel?: () => void
    onClose?: () => void
    onConfirm?: () => void
    onVisible?: (value?: boolean) => void
    primaryButton?: React.JSX.Element
    primaryButtonProps?: ButtonProps
    secondaryButton?: React.JSX.Element
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
    contentAnimatedStyle: AnimatedStyle<ViewStyle>
    footerAnimatedStyle: AnimatedStyle<ViewStyle>
    leading?: React.JSX.Element
    trailing?: React.JSX.Element
}

export interface SideSheetContentBaseProps extends SideSheetContentProps {
    render: (props: RenderSideSheetContentProps) => React.JSX.Element
}

export type HandleSheetWasVisibleOptions = Pick<SideSheetContentProps, 'onVisible'>
export type UseSideSheetContentAnimatedOptions = Pick<
    RenderSideSheetContentProps,
    'visible' | 'sheetPosition' | 'type' | 'footerVisible' | 'densityScale'
>

export interface HandleSideSheetContentVisibleAnimatedTimingSharedValue
    extends Pick<UseSideSheetContentAnimatedOptions, 'visible'> {
    backgroundColorSharedValue: SharedValue<AnimatableValue>
    contentTranslateXSharedValue: SharedValue<AnimatableValue>
    widthSharedValue: SharedValue<AnimatableValue>
}

export type RenderSideSheetContentLeadingOptions = Pick<SideSheetContentProps, 'headlineLeading' | 'back'>
export type RenderSideSheetContentTrailingOptions = Pick<SideSheetContentProps, 'headlineTrailing' | 'close'>
export type SheetContainerProps = Pick<RenderSideSheetContentProps, 'sheetPosition' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean}
export type SheetViewContentProps = Pick<RenderSideSheetContentProps, 'densityScale'>
