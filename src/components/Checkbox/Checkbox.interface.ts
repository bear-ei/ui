import type {ComponentStatus, EventName} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionStateChangeHandler} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {TouchableProps} from '../Touchable'
import type {CHECKBOX_VALUE} from './Checkbox.enum'

export type CheckboxValue = (typeof CHECKBOX_VALUE)[keyof typeof CHECKBOX_VALUE]
export interface CheckboxProps extends TouchableProps, ThemeableProps {
	checked?: boolean
	defaultChecked?: boolean
	disabled?: boolean
	error?: boolean
	indeterminate?: boolean
	labelText?: string
	onCheckedChange?: (checked: boolean) => void
}

export interface RenderCheckboxProps extends CheckboxProps, Pick<CheckboxState, 'status' | 'value'> {
	eventName?: EventName
	onInteractionStateChange: InteractionStateChangeHandler
}

export type CheckboxBaseProps = CheckboxProps
export interface CheckboxState {
	checked?: boolean
	eventName?: EventName
	pendingCheckedEvent?: boolean
	status: ComponentStatus
	value?: CheckboxValue
}

export interface UpdateCheckboxCheckedOptions extends Pick<RenderCheckboxProps, 'onCheckedChange' | 'indeterminate'> {
	notify?: boolean
}

export type HandleCheckboxInteractionStateChangeOptions = HandleInteractionStateChangeOptions &
	Pick<RenderCheckboxProps, 'checked' | 'indeterminate'> &
	Omit<UpdateCheckboxCheckedOptions, 'notify'>
