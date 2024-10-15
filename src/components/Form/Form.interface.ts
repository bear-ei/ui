import {ValidationError} from 'class-validator'
import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {NamePath} from '../../utils'
import {ComponentStatus} from '../Common'
import {FormItemProps, FormItemValidationRule} from './Form-item'
import {ForwardRefForm} from './Form.component'
import {useForm} from './use-form.hook'

export type FormError<T> = Partial<Record<keyof T, ValidationError[] | undefined>>
export interface OnValuesChangeOptions<T> {
    changedValue: T
    value: T
}

export interface FormCallbacks<T = Record<string, unknown>> {
    onFinish?: (value: T) => void
    onFinishFailed?: (error: FormError<T>) => void
    onValuesChange?: (options: OnValuesChangeOptions<T>) => void
}

export interface FormFieldsEntity<T = Record<string, unknown>> {
    name?: keyof T
    onComponentUpdate: () => void
    rule?: FormItemValidationRule
    touched: boolean
    validate: (value?: unknown) => Promise<ValidationError[] | undefined>
}

export interface FormStore<T = Record<string, unknown>> {
    getFieldsEntities: (signOut?: boolean) => FormFieldsEntity<T>[]
    getFieldsEntitiesName: (signOut?: boolean) => (names?: (keyof T)[]) => (keyof T | undefined)[]
    getFieldsError: {
        (): FormError<T>
        (name?: (keyof T)[]): FormError<T>
        (name?: keyof T): FormError<T>[keyof T]
    }

    getFieldsValue: {
        (): T
        (name?: (keyof T)[]): T
        (name?: keyof T): T[keyof T]
    }

    getInitialValues: {
        (): T
        (name?: (keyof T)[]): T
        (name?: keyof T): T[keyof T]
    }

    isFieldsTouched: (name?: NamePath) => boolean
    resetFields: (name?: NamePath) => void
    setCallbacks: (formCallbacks: FormCallbacks<T>) => void
    setFieldsError: (componentUpdate?: boolean) => (error: FormError<T>) => void
    setFieldsTouched: (touched?: boolean) => (name?: keyof T) => void
    setFieldsValue: (componentUpdate?: boolean) => (value?: T) => void
    setInitialValues: (initialized?: boolean) => (value?: T) => void
    signInFields: (entity: FormFieldsEntity<T>) => {signOut: () => void} | undefined
    signOutFields: (name?: NamePath) => void
    submit: (skipValidate?: boolean) => void
    validateFields: {
        (): Promise<FormError<T>>
        (name?: (keyof T)[]): Promise<FormError<T>>
        (name?: keyof T): Promise<FormError<T>[keyof T]>
    }
}

export interface FormProps<T = Record<string, unknown>>
    extends ViewProps,
        FormCallbacks<T>,
        Pick<FormItemProps, 'skeletonElement' | 'skeletonMinDuration' | 'validatorOptions' | 'validationDelay'>,
        RefAttributes<View> {
    form?: FormStore<T>
    formLayout?: 'horizontal' | 'vertical'
    initialValues?: T
    items?: FormItemProps[]
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

export type HandleFormCallbacksOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValuesChange'>
export type RenderFormItemOptions = Pick<
    FormItemProps,
    'skeletonElement' | 'skeletonMinDuration' | 'validatorOptions' | 'validationDelay'
>

export type FormComponent = typeof ForwardRefForm & {
    useForm: typeof useForm
}
