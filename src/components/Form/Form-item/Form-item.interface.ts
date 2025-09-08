import type {ValidationError, ValidatorOptions} from 'class-validator'
import type {RefAttributes} from 'react'
import type {NativeSyntheticEvent, TargetedEvent, View, ViewProps} from 'react-native'
import type {ComponentStatus} from '../../Common'
import type {FormProps, FormStore, FormValidatorOptions, ValidationRule} from '../Form.interface'

export interface FormItemControlProps {
	errorMessage?: string
	errors?: ValidationError[]
	id?: string
	labelText?: string
	onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void
	onValueChange?: (value?: unknown) => void
	value?: unknown
}

export interface FormItemProps
	extends Partial<ViewProps & Pick<FormItemControlProps, 'labelText'> & RefAttributes<View>>,
		Pick<FormProps, 'validatorOptions'> {
	initialValues?: Record<string, unknown>
	name?: string
	renderControl?: (props: FormItemControlProps) => React.JSX.Element
	rule?: ValidationRule
}

export interface RenderFormItemProps extends Omit<FormItemProps, 'rule'> {
	controlElement?: React.JSX.Element
}

export type FormItemBaseProps = FormItemProps
export interface FormItemState {
	shouldUpdate: Record<string, unknown>
	signOutEvent?: () => void
	status: ComponentStatus
}

export interface UpdateFormFieldValueIfChangedOptions extends Pick<FormStore, 'setFieldsValue'> {
	storeValue?: unknown
}

export interface HandleFormItemRuleChangeOptions extends Pick<FormStore, 'setFieldsValidate'> {
	validatorOptions?: FormValidatorOptions
}

export type ApplyFormItemStatusInitToDraftOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
	onComponentUpdate: () => void
	validationDelay?: number
	validatorOptions?: ValidatorOptions
} & Pick<FormStore, 'signInField'>
