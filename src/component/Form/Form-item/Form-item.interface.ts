import {ValidationError, ValidatorOptions} from 'class-validator'
import {RefAttributes} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View, ViewProps} from 'react-native'
import {ComponentStatus} from '../../Common'
import {FormStore} from '../Form.interface'

export type FormItemValidationRule = new (...args: any[]) => object
export interface FormItemControlProps {
    errorMessage?: string
    errors?: ValidationError[]
    id?: string
    labelText?: string
    onBlur: (event: NativeSyntheticEvent<TargetedEvent>) => void
    onValueChange?: (value?: unknown) => void
    value?: unknown
}

export interface FormItemProps
    extends Partial<ViewProps & Pick<FormItemControlProps, 'labelText'> & RefAttributes<View>> {
    initialValue?: Record<string, unknown>
    minSkeletonDuration?: number
    name?: string
    renderControl?: (props: FormItemControlProps) => JSX.Element
    rule?: FormItemValidationRule
    skeletonElement?: JSX.Element
    validationDelay?: number
    validatorOptions?: ValidatorOptions
}

export interface RenderFormItemProps extends Omit<FormItemProps, 'rule'> {
    control?: JSX.Element
}

export interface FormItemBaseProps extends FormItemProps {
    render: (props: RenderFormItemProps) => JSX.Element
}

export interface FormItemState {
    shouldUpdate: Record<string, unknown>
    signOut?: () => void
    status: ComponentStatus
}

export interface HandleFormItemValueChangeOptions extends Pick<FormStore, 'setFieldValue'> {
    storeValue?: unknown
}

export type HandleFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
    validate: (value?: unknown) => Promise<ValidationError[] | undefined>
    onComponentUpdate: () => void
} & Pick<FormStore, 'signInField'>

export interface HandleFormItemValidateOptions {
    rule?: FormItemValidationRule
    validatorOptions?: ValidatorOptions
}
