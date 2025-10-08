import {ComponentStatus, LayoutType} from '@/constants'
import type {ValidationError, ValidatorOptions} from 'class-validator'
import type {ForwardedRef, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {Updater} from 'use-immer'
import type {NamePath} from '../../utils'
import type {FormItemProps} from './Form-item'

export type FormErrors<T> = Partial<Record<keyof T, ValidationError[] | undefined>>
export type FormValidateRule<T> = Partial<Record<keyof T, ValidationRule | undefined>>
export type FormValidatorOptions = ValidatorOptions & {delay?: number}
export type ValidationRule = new (...args: any[]) => object
export interface OnValuesChangeOptions<T> {
        changedValues: T
        values: T
}

export interface FormCallbacks<T = Record<string, unknown>> {
        onFinish?: (values: T) => void
        onFinishFailed?: (errors: FormErrors<T>) => void
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

export type SignInFieldOptions<T> = Omit<FormFieldEntity<T>, 'validate'>
export interface SetFieldsValueOptions {
        componentUpdate?: boolean
        enableValidate?: boolean
}

export interface FormStoreOptions<T> {
        validateFields?: FormStore<T>['validateFields']
}

export interface FormStore<T = Record<string, unknown>> {
        getFieldEntities: (signOut?: boolean) => FormFieldEntity<T>[]
        getFieldEntitiesName: (signOut?: boolean) => (namePaths?: (keyof T)[]) => (keyof T | undefined)[]
        getFieldsError(name?: keyof T | (keyof T)[]): FormErrors<T> | FormErrors<T>[keyof T]
        getFieldsValue(name?: keyof T | (keyof T)[]): T | T[keyof T]
        getInitialValues(name?: keyof T | (keyof T)[]): T | T[keyof T]
        isFieldsTouched: (namePaths?: NamePath) => boolean
        resetFields: (namePaths?: NamePath) => void
        setCallbacks: (formCallbacks: FormCallbacks<T>) => void
        setFieldKeys: (fieldKeys?: (keyof T)[]) => void
        setFieldsError: (componentUpdate?: boolean) => (errors: FormErrors<T>) => void
        setFieldsTouched: (touched?: boolean) => (name?: keyof T) => void
        setFieldsValidate: (options?: FormValidatorOptions) => (rule: FormValidateRule<T>) => void
        setFieldsValue: (options?: SetFieldsValueOptions) => (value?: T) => void
        setInitialValues: (values?: T) => void
        signInField: (entity: FormFieldEntity<T>) => {signOut: () => void} | undefined
        signOutFields: (namePaths?: NamePath) => void
        submit: (enableValidate?: boolean) => void
        validateFields(name?: keyof T | (keyof T)[]): Promise<FormErrors<T> | FormErrors<T>[keyof T]>
}

export interface FormProps<T = Record<string, unknown>> extends ViewProps, FormCallbacks<T>, RefAttributes<View> {
        form?: FormStore<T>
        initialValues?: T
        items?: FormItemProps[]
        layoutType?: LayoutType
        ref?: ForwardedRef<View>
        validatorOptions?: FormValidatorOptions
}

export interface RenderFormProps<T = Record<string, unknown>> extends FormProps<T> {
        itemElements?: React.JSX.Element[] | React.JSX.Element
}

export type FormBaseProps<T = Record<string, unknown>> = FormProps<T>
export interface FormState {
        status: ComponentStatus
        nextInitialValuesEvent?: () => void
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

export type FormContainerProps = Pick<RenderFormProps, 'layoutType'> & RefAttributes<View>
export interface InitializeFormStateWithValuesOptions {
        status: ComponentStatus
        setState: Updater<FormState>
}
