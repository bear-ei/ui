import {ValidateError} from 'async-validator'
import {ValidationError} from 'class-validator'
import React, {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ValidateRule} from '../../../util'
import {ComponentStatus} from '../../Common'
import {FormStorage} from '../Form.interface'

export interface FormItemControlProps {
    errorMessage?: string
    errors?: ValidateError[]
    id?: string
    labelText?: string
    onValueChange?: (value?: unknown) => void
    value?: unknown
}

export interface FormItemProps
    extends Partial<ViewProps & Pick<FormItemControlProps, 'labelText'> & RefAttributes<View>> {
    initialValue?: Record<string, unknown>
    minSkeletonDuration?: number
    name?: string
    renderControl?: (props: FormItemControlProps) => JSX.Element
    rule: ValidateRule
    skeletonElement?: React.JSX.Element
}

export interface RenderFormItemProps extends Omit<FormItemProps, 'rule'> {
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

export interface ProcessFormItemValueChangeOptions extends Pick<FormStorage, 'setFieldValue'> {
    storageValue?: unknown
}

export type ProcessFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
    validate: (value?: unknown) => Promise<ValidationError[]>
} & Pick<FormStorage, 'signInField'>
