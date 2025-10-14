import {COMPONENT_STATUS} from '@/constants'
import {validate, ValidationError} from 'class-validator'
import type {FormItemProps} from './Form-item'
import type {
        CreateFormFieldValidatorOptions,
        FormCallbacks,
        InitializeFormStateWithValuesOptions,
        RegisterFormCallbacksOptions
} from './Form.interface'

export const initializeFormStateWithValues =
        <T,>(setInitialValues: (values?: T) => void) =>
        ({setState, status}: InitializeFormStateWithValuesOptions) =>
        (values?: T) => {
                if (status !== COMPONENT_STATUS.IDLE) {
                        return
                }

                if (values) {
                        setInitialValues(values)
                }

                setState(draft => {
                        draft.status = COMPONENT_STATUS.SUCCEEDED
                })
        }

export const registerFormCallbacks =
        <T,>(setCallbacks: (callbacks: FormCallbacks<T>) => void) =>
        ({onFinish, onFinishFailed, onValuesChange}: RegisterFormCallbacksOptions<T>) =>
                setCallbacks({onFinish, onFinishFailed, onValuesChange})

export const extractAndSetFormFieldKeys =
        <T,>(setFieldKeys: (keys?: (keyof T)[]) => void) =>
        (items?: FormItemProps[]) =>
                items && setFieldKeys(items.map(({name}) => name).filter(Boolean) as (keyof T)[])

export const createFormFieldValidator = <T,>({rule, validatorOptions}: CreateFormFieldValidatorOptions) => {
        const {
                forbidNonWhitelisted: isForbidNonWhitelisted = true,
                skipMissingProperties: isSkipMissingProperties = true,
                whitelist: isWhitelist = true,
                ...otherValidatorOptions
        } = validatorOptions ?? {}

        return (name?: keyof T) => async (value?: unknown) =>
                name && rule ?
                        validate(Object.assign(new rule(), {[name]: value}), {
                                ...otherValidatorOptions,
                                forbidNonWhitelisted: isForbidNonWhitelisted,
                                skipMissingProperties: isSkipMissingProperties,
                                whitelist: isWhitelist
                        }).then(errors => (errors.length ? errors : undefined))
                :       ([] as ValidationError[])
}
