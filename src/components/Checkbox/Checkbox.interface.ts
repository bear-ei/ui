import type {DefaultTheme} from 'styled-components/native'
import type {
	AnimatedTiming,
	AnimatedTimingOptions,
	InteractionHandler,
	ProcessStateEventChangeOptions
} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName} from '../Common'
import type {LayoutAnimatedType} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'
import type {CHECKBOX_VALUE} from './Checkbox.enum'

export type CheckboxValue = (typeof CHECKBOX_VALUE)[keyof typeof CHECKBOX_VALUE]
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
	interactionHandlers: InteractionHandler
	theme: DefaultTheme
}

export interface CheckboxBaseProps extends CheckboxProps {
	renderCheckbox: (props: RenderCheckboxProps) => React.JSX.Element
}

export interface CheckboxState {
	active?: boolean
	eventName?: EventName
	nextActiveEvent?: () => void
	status: ComponentStatus
	value?: CheckboxValue
}

export type HandleCheckboxActiveOptions = Pick<RenderCheckboxProps, 'onActive' | 'indeterminate'>
export type HandleCheckboxStateChangeOptions = ProcessStateEventChangeOptions &
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
