import {RefAttributes} from 'react'
import {PressableProps, TextStyle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hook'
import {EventName, TypographyProps} from '../../Common'
import {StepType} from '../Step.interface'

export interface StepItemProps extends Partial<ViewProps & RefAttributes<View> & PressableProps & OnStateEvent> {
    activeKey?: string
    densityScale?: number
    disabled?: boolean
    extraData?: unknown[]
    finished?: boolean
    finishedIcon?: React.JSX.Element
    icon?: React.JSX.Element
    itemKey: string
    labelText?: string
    onActive?: (value?: string) => void
    type?: StepType
}

export interface RenderStepItemProps extends Omit<StepItemProps, 'itemKey'> {
    active?: boolean
    activeColor: string
    activeIconElement: React.JSX.Element
    eventName?: EventName
    finishedIconElement: React.JSX.Element
    iconElement: React.JSX.Element
    labelAnimatedStyle: AnimatedStyle<ViewStyle>
    labelTextAnimatedStyle: AnimatedStyle<TextStyle>
    onStateEvent: OnStateEvent
    underlayColor: string
}

export interface StepItemBaseProps extends StepItemProps {
    render: (props: RenderStepItemProps) => React.JSX.Element
}

export interface StepItemState {
    eventName?: EventName
    nextPressOutEvent?: () => void
}

export type HandleStepItemStateEventChangeOptions = OnStateEventChangeOptions &
    Pick<StepItemProps, 'itemKey' | 'onActive'>

export interface UseStepItemAnimatedOptions extends Pick<RenderStepItemProps, 'active' | 'type'> {
    defaultActive?: boolean
}

export interface HandleStepItemAnimatedTimingOptions extends UseStepItemAnimatedOptions {
    animatedTiming: AnimatedTiming
}

export interface HandleStepItemAnimatedTimingSharedValue {
    labelHeightSharedValue: SharedValue<AnimatableValue>
    labelTextColorSharedValue: SharedValue<AnimatableValue>
}

export type StepItemLabelTextProps = Pick<RenderStepItemProps, 'active'> & TypographyProps
export type StepItemHeaderProps = Pick<RenderStepItemProps, 'type' | 'densityScale'>
export type StepItemContentProps = Pick<RenderStepItemProps, 'type' | 'densityScale'>
export interface StepItemIconProps {
    visible?: boolean
}
