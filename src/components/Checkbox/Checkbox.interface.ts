import type {ComponentStatus, EventName} from '../../constants'
import type {HandleStateEventChangeOptions, StateEventChangeHandler} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {TouchableProps} from '../Touchable'
import type {CHECKBOX_VALUE} from './Checkbox.enum'

export type CheckboxValue = (typeof CHECKBOX_VALUE)[keyof typeof CHECKBOX_VALUE]
export interface CheckboxProps extends TouchableProps, ThemeProps {
	active?: boolean
	defaultActive?: boolean
	disabled?: boolean
	error?: boolean
	indeterminate?: boolean
	labelText?: string
	onActive?: (active: boolean) => void
	value?: CheckboxValue
}

export interface RenderCheckboxProps extends CheckboxProps, Pick<CheckboxState, 'status'> {
	eventName?: EventName
	onStateEventChange: StateEventChangeHandler
}

export type CheckboxBaseProps = CheckboxProps
export interface CheckboxState {
	active?: boolean
	eventName?: EventName
	pendingActiveEvent?: boolean
	status: ComponentStatus
	value?: CheckboxValue
}

export interface UpdateCheckboxActiveOptions extends Pick<RenderCheckboxProps, 'onActive' | 'indeterminate'> {
	triggerEvent?: boolean
}

export type HandleCheckboxStateChangeOptions = HandleStateEventChangeOptions &
	Pick<RenderCheckboxProps, 'active' | 'indeterminate'> &
	Omit<UpdateCheckboxActiveOptions, 'triggerEvent'>
