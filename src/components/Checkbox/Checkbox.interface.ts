import type {
	AnimatedTiming,
	AnimatedTimingOptions,
	HandleStateEventChangeOptions,
	InteractionHandlers
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
	animatedOptions: CheckboxIconAnimatedOptions
	eventName?: EventName
	interactionHandlers: InteractionHandlers
}

export type CheckboxBaseProps = CheckboxProps
export interface CheckboxState {
	active?: boolean
	eventName?: EventName
	nextActiveEvent?: () => void
	status: ComponentStatus
	value?: CheckboxValue
}

export type UpdateCheckboxActiveOptions = Pick<RenderCheckboxProps, 'onActive' | 'indeterminate'>
export type HandleCheckboxStateChangeOptions = HandleStateEventChangeOptions &
	Pick<RenderCheckboxProps, 'active' | 'indeterminate'> &
	UpdateCheckboxActiveOptions

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

export type CheckboxContainerProps = Pick<RenderCheckboxProps, 'density'>
export type CheckboxContentProps = Pick<RenderCheckboxProps, 'density'>
