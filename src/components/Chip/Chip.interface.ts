import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName, ShapeType} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type ChipStyle = 'filled' | 'outlined'
export type ChipType = 'input' | 'assist' | 'filter' | 'suggestion' | 'inputFilled'
export interface ChipProps extends TouchableProps {
        active?: boolean
        avatar?: JSX.Element
        chipStyle?: ChipStyle
        close?: boolean
        elevated?: boolean
        labelText?: string
        leadingIcon?: JSX.Element
        loading?: boolean
        onClose?: () => void
        shape?: ShapeType
        trailingIcon?: JSX.Element
        type?: ChipType
}

export interface RenderChipProps extends ChipProps {
        activeColor?: string
        backgroundUnderlayAnimatedStyle?: AnimatedStyle<ViewStyle>
        elevation: ElevationLevel
        eventName?: EventName
        filterIconContainerAnimatedStyle: AnimatedStyle<TextStyle>
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
        theme: DefaultTheme
        trailing?: JSX.Element
}

export interface ChipBaseProps extends ChipProps {
        render: (props: RenderChipProps) => JSX.Element
}

export interface ChipState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type HandleChipStateChangeOptions = OnStateEventChangeOptions
export type HandleChipElevationOptions = Pick<ChipProps, 'disabled' | 'type' | 'elevated'>
export type HandleChipIconOptions = Pick<RenderChipProps, 'disabled' | 'eventName' | 'onClose'>
export type UseChipAnimatedOptions = Pick<RenderChipProps, 'disabled' | 'type' | 'active' | 'elevated' | 'chipStyle'>
export interface HandleChipAnimatedTimingOptions extends Omit<UseChipAnimatedOptions, 'eventName'> {
        animatedTiming: AnimatedTiming
        borderInputRange: number[]
}

export interface HandleChipAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
        filterIconContainerWidthSharedValue: SharedValue<number>
}

export type ChipContainerProps = Pick<RenderChipProps, 'type'>
export type ChipContentProps = Pick<RenderChipProps, 'type'>
export interface ChipMainProps extends Pick<RenderChipProps, 'type'> {
        avatarShow: boolean
        leadingIconShow: boolean
        trailingIconShow: boolean
}

export type ChipTrailingProps = Pick<RenderChipProps, 'type'>
