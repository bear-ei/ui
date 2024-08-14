import {RuleItem, ValidateError} from 'async-validator'
import React, {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ValidateOptions} from '../../../utils'
import {ComponentStatus} from '../../Common'
import {FormFieldError, FormStorage} from '../Form.interface'

export interface FormItemControlProps {
    errorMessage?: string
    errors?: ValidateError[]
    id?: string
    labelText?: string
    onValueChange?: (value?: unknown) => void
    value?: unknown
}

export interface FormItemProps
    extends Partial<
        ViewProps &
            Pick<FormItemControlProps, 'labelText'> &
            Pick<ValidateOptions, 'rules' | 'validateFirst'> &
            RefAttributes<View>
    > {
    initialValue?: Record<string, unknown>
    minSkeletonDuration?: number
    name?: string
    renderControl?: (props: FormItemControlProps) => JSX.Element
    skeletonElement?: React.JSX.Element
}

export interface RenderFormItemProps extends Omit<FormItemProps, 'rules'> {
    control?: React.JSX.Element
}

export interface FormItemBaseProps extends FormItemProps {
    render: (props: RenderFormItemProps) => React.JSX.Element
}

export interface InitialFormItemState {
    shouldUpdate: Record<string, unknown>
    signOut?: () => void
    status: ComponentStatus
}

export interface HandleFormItemValueChangeOptions extends Pick<FormStorage, 'setFieldValue'> {
    storageValue?: unknown
}

export interface HandleFormItemValidateOptions {
    rules?: RuleItem[]
    validateFirst?: boolean
}

export type HandleFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rules' | 'validateFirst'> & {
    validate: (value?: unknown) => Promise<FormFieldError | undefined>
} & Pick<FormStorage, 'signInField'>
