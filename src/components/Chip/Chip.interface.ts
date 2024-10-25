import {RefObject} from 'react'
import {TextStyle, View, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName, ShapeType} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type ChipType = 'input' | 'assist' | 'filter' | 'suggestion' | 'inputFilled'
export interface ChipProps extends TouchableProps {
        active?: boolean
        avatar?: JSX.Element
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
        contentUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation: ElevationLevel
        eventName?: EventName
        filterIconContainerAnimatedStyle: AnimatedStyle<TextStyle>
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
        trailing?: JSX.Element
}

export interface ChipBaseProps extends ChipProps {
        render: (props: RenderChipProps) => JSX.Element
}

export interface ChipState {
        elevation?: ElevationLevel
        eventName?: EventName
        nextPressInEvent?: () => void
        status: ComponentStatus
}

export interface HandleChipStateChangeOptions extends OnStateEventChangeOptions {
        touchableRef: RefObject<View>
}

export type HandleChipElevationOptions = Pick<ChipProps, 'disabled' | 'type' | 'elevated'>
export type RenderChipIconOptions = Pick<RenderChipProps, 'disabled' | 'eventName' | 'onClose' | 'type'>
export type UseChipAnimatedOptions = Pick<RenderChipProps, 'disabled' | 'type' | 'active' | 'elevated'>
export interface HandleChipAnimatedTimingOptions extends Omit<UseChipAnimatedOptions, 'eventName'> {
        animatedTiming: AnimatedTiming
        borderInputRange: number[]
}

export interface HandleChipAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        filterIconContainerWidthSharedValue: SharedValue<AnimatableValue>
}

export type ChipContainerProps = Pick<RenderChipProps, 'type'>
export type ChipContentProps = Pick<RenderChipProps, 'type'>
export interface ChipMainProps extends Pick<RenderChipProps, 'type'> {
        avatarShow: boolean
        leadingIconShow: boolean
        trailingIconShow: boolean
}

export type ChipTrailingProps = Pick<RenderChipProps, 'type'>
