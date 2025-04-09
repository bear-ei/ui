import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, AnimatedTimingOptions, HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {CommonProps, ComponentStatus, EventName} from '../Common'
import {LayoutAnimatedType} from '../Layout-animated'
import {TouchableProps} from '../Touchable'
import {CheckboxValue} from './Checkbox.enum'

export interface CheckboxProps extends TouchableProps, CommonProps {
        active?: boolean
        defaultActive?: boolean
        disabled?: boolean
        error?: boolean
        indeterminate?: boolean
        onActive?: (active?: boolean) => void
        value?: CheckboxValue
}

export interface RenderCheckboxProps extends CheckboxProps {
        eventName?: EventName
        stateOnEvent: StateOnEvent
        theme: DefaultTheme
}

export interface CheckboxBaseProps extends CheckboxProps {
        render: (props: RenderCheckboxProps) => React.JSX.Element
}

export interface CheckboxState {
        active?: boolean
        eventName?: EventName
        nextActiveEvent?: () => void
        status: ComponentStatus
        value?: CheckboxValue
}

export type HandleCheckboxActiveOptions = Pick<RenderCheckboxProps, 'onActive' | 'indeterminate'>
export type HandleCheckboxStateChangeOptions = HandleStateEventChangeOptions &
        Pick<RenderCheckboxProps, 'active' | 'indeterminate'> &
        HandleCheckboxActiveOptions

export type UseCheckboxAnimatedOptions = Pick<RenderCheckboxProps, 'active'>
export interface HandleCheckboxIconAnimatedOptions {
        animatedTiming: AnimatedTiming
}

export type CheckboxIconAnimatedOptions = {
        animatedType: LayoutAnimatedType
        entry: AnimatedTimingOptions
        exit: AnimatedTimingOptions
}

export interface CheckboxIconLayoutProps {
        visible?: boolean
        zIndex?: number
}

export type CheckboxContentProps = Pick<RenderCheckboxProps, 'density'>
