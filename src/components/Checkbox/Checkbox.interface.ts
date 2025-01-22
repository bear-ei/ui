import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {LayoutAnimatedType} from '../Layout-animated'
import {TouchableProps} from '../Touchable'

export type CheckboxType = 'selected' | 'indeterminate' | 'unselected'
export interface CheckboxProps extends TouchableProps {
        active?: boolean
        defaultActive?: boolean
        disabled?: boolean
        error?: boolean
        indeterminate?: boolean
        onActive?: (value?: boolean) => void
        type?: CheckboxType
}

export interface RenderCheckboxProps extends CheckboxProps {
        eventName?: EventName
        onStateEvent: OnStateEvent
        theme: DefaultTheme
}

export interface CheckboxBaseProps extends CheckboxProps {
        render: (props: RenderCheckboxProps) => JSX.Element
}

export interface CheckboxState {
        active?: boolean
        eventName?: EventName
        nextActiveEvent?: () => void
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

export type CheckboxIconAnimatedOptions = {
        animatedType: LayoutAnimatedType
        entry: AnimatedTimingOptions
        exit: AnimatedTimingOptions
}

export interface CheckboxIconLayoutProps {
        visible?: boolean
        zIndex?: number
}
