import {ValidationError} from 'class-validator'
import React, {RefAttributes} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View, ViewProps} from 'react-native'
import {ComponentStatus} from '../../Common'
import {FormStorage} from '../Form.interface'

export type FormItemValidationRule = new (...args: any[]) => {}
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

export interface HandleFormItemValueChangeOptions extends Pick<FormStorage, 'setFieldValue'> {
    storageValue?: unknown
}

export type HandleFormItemInitOptions = Pick<FormItemBaseProps, 'name' | 'rule'> & {
    validate: (value?: unknown) => Promise<ValidationError[] | undefined>
} & Pick<FormStorage, 'signInField'>
