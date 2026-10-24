import type {ValidationError, ValidatorOptions} from 'class-validator'
import type {JSX, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {Updater} from 'use-immer'

import type {ComponentStatus, Orientation} from '../../constants'
import type {NamePath} from '../../utils'
import type {FormItemProps} from './Form-item'

export type FormErrors<T> = Partial<Record<keyof T, ValidationError[] | undefined>>
export type FormValidateRule<T> = Partial<Record<keyof T, ValidationRule | undefined>>
export type FormValidatorOptions = ValidatorOptions & {delay?: number}
export type ValidationRule = new (...args: any[]) => object
export interface ValuesChangeEvent<T> {
	changedValues: T
	values: T
}

export interface FormCallbacks<T> {
	onFinish?: (values: T) => void
	onFinishFailed?: (errors: FormErrors<T>) => void
	onValuesChange?: (event: ValuesChangeEvent<T>) => void
}

export interface FormFieldEntity<T> {
	name?: keyof T
	onComponentUpdate: () => void
	rule?: ValidationRule
	touched: boolean
	validate?: (value?: unknown) => Promise<ValidationError[] | undefined>
	validatorOptions?: FormValidatorOptions
}

export type RegisterFieldOptions<T> = Omit<FormFieldEntity<T>, 'validate'>
export interface SetFieldsValueOptions {
	componentUpdate?: boolean
	enableValidate?: boolean
}

export interface FormStoreOptions<T> {
	validateFields?: FormStore<T>['validateFields']
}

export interface FormStore<T = any> {
	getFieldEntities: (includeUnnamed?: boolean) => FormFieldEntity<T>[]
	getFieldEntityNames: (namePaths?: (keyof T)[], includeUnnamed?: boolean) => (keyof T | undefined)[]
	getFieldsError(namePaths?: NamePath<T>): FormErrors<T> | FormErrors<T>[keyof T]
	getFieldsValue(namePaths?: NamePath<T>): T | T[keyof T]
	getInitialValues(namePaths?: NamePath<T>): T | T[keyof T]
	isFieldsTouched: (namePaths?: NamePath<T>) => boolean
	registerField: (entity: FormFieldEntity<T>) => {unregister: () => void} | undefined
	resetFields: (namePaths?: NamePath<T>) => void
	setCallbacks: (formCallbacks: FormCallbacks<T>) => void
	setFieldKeys: (fieldKeys?: (keyof T)[]) => void
	setFieldsError: (errors: FormErrors<T>, componentUpdate?: boolean) => void
	setFieldsTouched: (name: keyof T, touched?: boolean) => void
	setFieldsValidate: (rule: FormValidateRule<T>, options?: FormValidatorOptions) => void
	setFieldsValue: (value?: T, options?: SetFieldsValueOptions) => void
	setInitialValues: (values?: T) => void
	submit: (enableValidate?: boolean) => void
	unregisterFields: (namePaths?: NamePath<T>) => void
	validateFields(namePaths?: NamePath<T>): Promise<FormErrors<T> | FormErrors<T>[keyof T]>
}

export interface FormProps<T = any> extends ViewProps, FormCallbacks<T>, RefAttributes<View> {
	fields?: FormItemProps[]
	form?: FormStore<T>
	initialValues?: T
	orientation?: Orientation
	validatorOptions?: FormValidatorOptions
}

export interface RenderFormProps extends FormProps, Pick<FormState, 'status'> {
	fieldElements?: JSX.Element[] | JSX.Element
}

export type FormBaseProps = FormProps
export interface FormState {
	status: ComponentStatus
}

export type RegisterFormCallbacksOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValuesChange'>
export interface RenderFormFieldsProps extends Pick<FormProps, 'validatorOptions' | 'id' | 'fields'> {
	status: ComponentStatus
}

export interface CreateFormFieldValidatorOptions {
	rule?: ValidationRule
	validatorOptions?: ValidatorOptions
}

export interface InitializeFormStateWithValuesOptions {
	setState: Updater<FormState>
	status: ComponentStatus
}
