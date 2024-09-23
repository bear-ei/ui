import {ValidationError} from 'class-validator'
import React, {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {NamePath} from '../../util'
import {ComponentStatus} from '../Common'
import {FormItemProps, FormItemValidationRule} from './Form-item'
import {ForwardRefForm} from './Form.component'
import {useForm} from './use-form.hook'

export type FormError<T> = Record<keyof T, ValidationError[] | undefined>
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
    onFormStorageChange: () => void
    rule?: FormItemValidationRule
    touched: boolean
    validate: (value?: unknown) => Promise<ValidationError[] | undefined>
}

export interface FormStorage<T = Record<string, unknown>> {
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
    setCallback: (callback: FormCallback<T>) => void
    setFieldError: (error: FormError<T>) => void
    setFieldTouched: (touched?: boolean) => (name?: keyof T) => void
    setFieldValue: (skipValidate?: boolean) => (updateComponent?: boolean) => (value?: T) => void
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

export interface FormProps<T = Record<string, unknown>>
    extends ViewProps,
        RefAttributes<View>,
        FormCallback<T>,
        Pick<FormItemProps, 'skeletonElement' | 'minSkeletonDuration'> {
    form?: FormStorage<T>
    formLayout?: 'horizontal' | 'vertical'
    initialValue?: T
    items?: FormItemProps[]
    validationRule?: FormItemValidationRule
}

export interface RenderFormProps<T> extends FormProps<T> {
    itemElements?: React.JSX.Element[] | React.JSX.Element
}

export interface FormBaseProps<T = Record<string, unknown>> extends FormProps<T> {
    render: (props: RenderFormProps<T>) => React.JSX.Element
}

export interface InitialFormState {
    status: ComponentStatus
}

export type HandleFormCallbackOptions<T> = Pick<FormProps<T>, 'onFinish' | 'onFinishFailed' | 'onValueChange'>
export type RenderFormItemOptions = Pick<FormItemProps, 'skeletonElement' | 'minSkeletonDuration'>
export type FormComponent = typeof ForwardRefForm & {
    useForm: typeof useForm
}
