import type {ValidationError, ValidatorOptions} from 'class-validator'
import type {ForwardedRef, JSX, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {Updater} from 'use-immer'

import type {ComponentStatus, LayoutType} from '../../constants'
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

export interface FormCallbacks<T = any> {
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

export type SignInFieldOptions<T> = Omit<FormFieldEntity<T>, 'validate'>
export interface SetFieldsValueOptions {
	componentUpdate?: boolean
	enableValidate?: boolean
}

export interface FormStoreOptions<T> {
	validateFields?: FormStore<T>['validateFields']
}

export interface FormStore<T = any> {
	getFieldEntities: (signOut?: boolean) => FormFieldEntity<T>[]
	getFieldEntitiesName: (namePaths?: (keyof T)[], signOut?: boolean) => (keyof T | undefined)[]
	getFieldsError(namePaths?: NamePath<T>): FormErrors<T> | FormErrors<T>[keyof T]
	getFieldsValue(namePaths?: NamePath<T>): T | T[keyof T]
	getInitialValues(namePaths?: NamePath<T>): T | T[keyof T]
	isFieldsTouched: (namePaths?: NamePath<T>) => boolean
	resetFields: (namePaths?: NamePath<T>) => void
	setCallbacks: (formCallbacks: FormCallbacks<T>) => void
	setFieldKeys: (fieldKeys?: (keyof T)[]) => void
	setFieldsError: (errors: FormErrors<T>, componentUpdate?: boolean) => void
	setFieldsTouched: (name: keyof T, touched?: boolean) => void
	setFieldsValidate: (rule: FormValidateRule<T>, options?: FormValidatorOptions) => void
	setFieldsValue: (value?: T, options?: SetFieldsValueOptions) => void
	setInitialValues: (values?: T) => void
	signInField: (entity: FormFieldEntity<T>) => {signOut: () => void} | undefined
	signOutFields: (namePaths?: NamePath<T>) => void
	submit: (enableValidate?: boolean) => void
	validateFields(namePaths?: NamePath<T>): Promise<FormErrors<T> | FormErrors<T>[keyof T]>
}

export interface FormProps<T = any> extends ViewProps, FormCallbacks<T>, RefAttributes<View> {
	form?: FormStore<T>
	initialValues?: T
	items?: FormItemProps[]
	layoutType?: LayoutType
	ref?: ForwardedRef<View>
	validatorOptions?: FormValidatorOptions
}

export interface RenderFormProps extends FormProps, Pick<FormState, 'status'> {
	itemElements?: JSX.Element[] | JSX.Element
}

export type FormBaseProps = FormProps
export interface FormState {
	status: ComponentStatus
}

export type RegisterFormCallbacksOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValuesChange'>
export interface RenderFormItemsProps extends Pick<FormProps, 'validatorOptions' | 'id' | 'items'> {
	status: ComponentStatus
}

export interface CreateFormFieldValidatorOptions {
	rule?: ValidationRule
	validatorOptions?: ValidatorOptions
}

export interface UseFormOptions<T> {
	form?: FormStore<T>
}

export interface InitializeFormStateWithValuesOptions {
	setState: Updater<FormState>
	status: ComponentStatus
}
