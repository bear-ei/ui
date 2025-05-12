import type {ValidationError, ValidatorOptions} from 'class-validator'
import type {ForwardedRef, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {NamePath} from '../../utils'
import type {ComponentStatus, LayoutType} from '../Common'
import type {FormItemProps} from './Form-item'

export type FormError<T> = Partial<Record<keyof T, ValidationError[] | undefined>>
export type FormValidateRule<T> = Partial<Record<keyof T, ValidationRule | undefined>>
export type FormValidatorOptions = ValidatorOptions & {delay?: number}
export type ValidationRule = new (...args: any[]) => object
export interface OnValuesChangeOptions<T> {
	changedValue: T
	value: T
}

export interface FormCallback<T = Record<string, unknown>> {
	onFinish?: (value: T) => void
	onFinishFailed?: (error: FormError<T>) => void
	onValuesChange?: (options: OnValuesChangeOptions<T>) => void
}

export interface FormFieldEntity<T = Record<string, unknown>> {
	name?: keyof T
	onComponentUpdate: () => void
	rule?: ValidationRule
	touched: boolean
	validate?: (value?: unknown) => Promise<ValidationError[] | undefined>
	validatorOptions?: FormValidatorOptions
}

export interface SetFieldsValueOptions {
	componentUpdate?: boolean
	enableValidate?: boolean
}

export interface FormStore<T = Record<string, unknown>> {
	getFieldEntities: (signOut?: boolean) => FormFieldEntity<T>[]
	getFieldEntitiesName: (signOut?: boolean) => (namePaths?: (keyof T)[]) => (keyof T | undefined)[]
	getFieldsError: {
		(): FormError<T>
		(namePaths?: (keyof T)[]): FormError<T>
		(name?: keyof T): FormError<T>[keyof T]
	}

	getFieldsValue: {
		(): T
		(namePaths?: (keyof T)[]): T
		(name?: keyof T): T[keyof T]
	}

	getInitialValues: {
		(): T
		(namePaths?: (keyof T)[]): T
		(name?: keyof T): T[keyof T]
	}

	isFieldsTouched: (namePaths?: NamePath) => boolean
	resetFields: (namePaths?: NamePath) => void
	setCallbacks: (formCallback: FormCallback<T>) => void
	setFieldKeys: (fieldKeys?: (keyof T)[]) => void
	setFieldsError: (componentUpdate?: boolean) => (error: FormError<T>) => void
	setFieldsTouched: (touched?: boolean) => (name?: keyof T) => void
	setFieldsValidate: (options?: FormValidatorOptions) => (rule: FormValidateRule<T>) => void
	setFieldsValue: (options?: SetFieldsValueOptions) => (value?: T) => void
	setInitialValues: (initialized?: boolean) => (value?: T) => void
	signInField: (entity: FormFieldEntity<T>) => {signOut: () => void} | undefined
	signOutFields: (namePaths?: NamePath) => void
	submit: (enableValidate?: boolean) => void
	validateFields: {
		(): Promise<FormError<T>>
		(namePaths?: (keyof T)[]): Promise<FormError<T>>
		(name?: keyof T): Promise<FormError<T>[keyof T]>
	}
}

export interface FormProps<T = Record<string, unknown>> extends ViewProps, FormCallback<T>, RefAttributes<View> {
	form?: FormStore<T>
	initialValue?: T
	items?: FormItemProps[]
	layout?: LayoutType
	ref?: ForwardedRef<View>
	validatorOptions?: FormValidatorOptions
}

export interface RenderFormProps<T = Record<string, unknown>> extends FormProps<T> {
	itemElements?: React.JSX.Element[] | React.JSX.Element
}

export interface FormBaseProps<T = Record<string, unknown>> extends FormProps<T> {
	renderForm: (props: RenderFormProps<T>) => React.JSX.Element
}

export interface FormState {
	status: ComponentStatus
}

export type HandleFormCallbacksOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValuesChange'>
export type RenderFormItemsOptions = Pick<FormProps, 'validatorOptions' | 'id'>
export interface HandleFormValidateOptions {
	rule?: ValidationRule
	validatorOptions?: ValidatorOptions
}

export interface UseFormOptions<T> {
	form?: FormStore<T>
}

export type FormContainerProps = Pick<RenderFormProps, 'layout'>
