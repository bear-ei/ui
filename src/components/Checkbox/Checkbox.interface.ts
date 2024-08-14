import {ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {TouchableProps} from '../Touchable'

export type CheckboxType = 'selected' | 'indeterminate' | 'unselected'
export interface CheckboxProps extends TouchableProps {
    active?: boolean
    defaultActive?: boolean
    densityScale?: number
    disabled?: boolean
    error?: boolean
    indeterminate?: boolean
    onActive?: (value?: boolean) => void
    type?: CheckboxType
}

export interface RenderCheckboxProps extends CheckboxProps {
    eventName?: EventName
    iconAnimatedStyle: AnimatedStyle<ViewStyle>
    onStateEvent: OnStateEvent
    theme: DefaultTheme
}

export interface CheckboxBaseProps extends CheckboxProps {
    render: (props: RenderCheckboxProps) => React.JSX.Element
}

export interface InitialCheckboxState {
    checkboxActive?: boolean
    eventName?: EventName
    nextActiveCallback?: () => void
    nextPressOutEvent?: () => void
    status: ComponentStatus
    type?: CheckboxType
}

export type HandleCheckboxActiveOptions = Pick<RenderCheckboxProps, 'onActive' | 'indeterminate'>
export type HandleCheckboxStateChangeOptions = OnStateEventChangeOptions &
    Pick<RenderCheckboxProps, 'active' | 'indeterminate'> &
    HandleCheckboxActiveOptions

export type UseCheckboxAnimatedOptions = Pick<RenderCheckboxProps, 'active'>
export interface HandleCheckboxIconAnimatedOptions {
    animatedTiming: AnimatedTiming
}

export type CheckboxContainerProps = Pick<RenderCheckboxProps, 'densityScale'>
export type CheckboxContentProps = Pick<RenderCheckboxProps, 'densityScale'>
export interface CheckboxIconContainerProps {
    visible?: boolean
    zIndex?: number
}
