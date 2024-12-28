import {ValidationError, ValidatorOptions} from 'class-validator'
import {RefAttributes} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View, ViewProps} from 'react-native'
import {ComponentStatus} from '../../Common'
import {FormStore, FormValidatorOptions, ValidationRule} from '../Form.interface'

export interface FormItemControlProps {
        errorMessage?: string
        errors?: ValidationError[]
        id?: string
        labelText?: string
        onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void
        onLoadEnd?: () => void
        onValuesChange?: (value?: unknown) => void
        value?: unknown
}

export interface FormItemProps
        extends Partial<ViewProps & Pick<FormItemControlProps, 'labelText'> & RefAttributes<View>> {
        initialValues?: Record<string, unknown>
        name?: string
        onLoadEnd?: () => void
        renderControl?: (props: FormItemControlProps) => JSX.Element
        rule?: ValidationRule
        skeletonElement?: JSX.Element
        skeletonDuration?: number
        validatorOptions?: FormValidatorOptions
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

export interface HandleFormItemValueChangeOptions extends Pick<FormStore, 'setFieldsValue'> {
        storeValue?: unknown
}

export interface HandleFormItemRuleChangeOptions extends Pick<FormStore, 'setFieldsValidate'> {
        validatorOptions?: FormValidatorOptions
}

export type HandleFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
        onComponentUpdate: () => void
        validationDelay?: number
        validatorOptions?: ValidatorOptions
} & Pick<FormStore, 'signInFields'>
