import {ValidationError, ValidatorOptions} from 'class-validator'
import {RefAttributes} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View, ViewProps} from 'react-native'
import {ComponentStatus} from '../../Common'
import {FormProps, FormStore, FormValidatorOptions, ValidationRule} from '../Form.interface'

export interface FormItemControlProps {
        errorMessage?: string
        errors?: ValidationError[]
        id?: string
        labelText?: string
        onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void
        onLoadEnd?: () => void
        onValueChange?: (value?: unknown) => void
        value?: unknown
}

export interface FormItemProps
        extends Partial<ViewProps & Pick<FormItemControlProps, 'labelText'> & RefAttributes<View>>,
                Pick<FormProps, 'validatorOptions' | 'onLoadEnd'> {
        initialValues?: Record<string, unknown>
        name?: string
        renderControl?: (props: FormItemControlProps) => JSX.Element
        rule?: ValidationRule
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

export interface HandleFormItemRuleChangeOptions extends Pick<FormStore, 'setFieldValidate'> {
        validatorOptions?: FormValidatorOptions
}

export type HandleFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
        onComponentUpdate: () => void
        validationDelay?: number
        validatorOptions?: ValidatorOptions
} & Pick<FormStore, 'signInField'>
