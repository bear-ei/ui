import {ValidationError, ValidatorOptions} from 'class-validator'
import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {NamePath} from '../../utils'
import {ComponentStatus} from '../Common'
import {FormItemProps} from './Form-item'
import {ForwardRefForm} from './Form.component'
import {useForm} from './use-form.hook'

export type FormError<T> = Partial<Record<keyof T, ValidationError[] | undefined>>
export type FormValidateRule<T> = Partial<Record<keyof T, ValidationRule | undefined>>
export type FormValidatorOptions = ValidatorOptions & {delay?: number}
export type ValidationRule = new (...args: any[]) => object
export interface OnValueChangeOptions<T> {
        changedValue: T
        value: T
}

export interface FormCallback<T = Record<string, unknown>> {
        onFinish?: (value: T) => void
        onFinishFailed?: (error: FormError<T>) => void
        onValueChange?: (options: OnValueChangeOptions<T>) => void
}

export interface FormFieldEntity<T = Record<string, unknown>> {
        name?: keyof T
        onComponentUpdate: () => void
        rule?: ValidationRule
        touched: boolean
        validate?: (value?: unknown) => Promise<ValidationError[] | undefined>
        validatorOptions?: FormValidatorOptions
}

export interface FormStore<T = Record<string, unknown>> {
        getFieldEntities: (signOut?: boolean) => FormFieldEntity<T>[]
        getFieldEntitiesName: (signOut?: boolean) => (names?: (keyof T)[]) => (keyof T | undefined)[]
        getFieldError: {
                (): FormError<T>
                (name?: (keyof T)[]): FormError<T>
                (name?: keyof T): FormError<T>[keyof T]
        }

        getFieldValue: {
                (): T
                (name?: (keyof T)[]): T
                (name?: keyof T): T[keyof T]
        }

        getInitialValue: {
                (): T
                (name?: (keyof T)[]): T
                (name?: keyof T): T[keyof T]
        }

        isFieldTouched: (name?: NamePath) => boolean
        resetField: (name?: NamePath) => void
        setCallback: (formCallback: FormCallback<T>) => void
        setFieldError: (componentUpdate?: boolean) => (error: FormError<T>) => void
        setFieldKeys: (values?: (keyof T)[]) => void
        setFieldTouched: (touched?: boolean) => (name?: keyof T) => void
        setFieldValidate: (options?: FormValidatorOptions) => (rule: FormValidateRule<T>) => void
        setFieldValue: (componentUpdate?: boolean) => (value?: T) => void
        setInitialValue: (initialized?: boolean) => (value?: T) => void
        signInField: (entity: FormFieldEntity<T>) => {signOut: () => void} | undefined
        signOutField: (name?: NamePath) => void
        submit: (skipValidate?: boolean) => void
        validateField: {
                (): Promise<FormError<T>>
                (name?: (keyof T)[]): Promise<FormError<T>>
                (name?: keyof T): Promise<FormError<T>[keyof T]>
        }
}

export interface FormProps<T = Record<string, unknown>> extends ViewProps, FormCallback<T>, RefAttributes<View> {
        form?: FormStore<T>
        formLayout?: 'horizontal' | 'vertical'
        initialValue?: T
        items?: FormItemProps[]
        onLoadEnd?: () => void
        validatorOptions?: FormValidatorOptions
}

export interface RenderFormProps<T> extends FormProps<T> {
        itemElements?: JSX.Element[] | JSX.Element
}

export interface FormBaseProps<T = Record<string, unknown>> extends FormProps<T> {
        render: (props: RenderFormProps<T>) => JSX.Element
}

export interface FormState {
        status: ComponentStatus
}

export type HandleFormCallbackOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValueChange'>
export type RenderFormItemsOptions = Pick<FormProps, 'validatorOptions' | 'onLoadEnd' | 'id'>
export interface HandleFormValidateOptions {
        rule?: ValidationRule
        validatorOptions?: ValidatorOptions
}

export type FormComponent = typeof ForwardRefForm & {
        useForm: typeof useForm
}

export interface UseFormOptions<T> {
        form?: FormStore<T>
}
