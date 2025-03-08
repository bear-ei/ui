import {validate, ValidationError} from 'class-validator'
import {Updater} from 'use-immer'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {
        FormCallback,
        FormState,
        HandleFormCallbackOptions,
        HandleFormValidateOptions,
        RenderFormItemsOptions
} from './Form.interface'

export const handleFormStatus =
        <T,>(setState: Updater<FormState>) =>
        (setInitialValue: (initialized?: boolean) => (value?: T) => void) =>
        (value?: T) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        if (value) {
                                setInitialValue()(value)
                        }

                        draft.status = 'succeeded'
                })

export const handleFormCallback =
        <T,>(setCallback: (callback: FormCallback<T>) => void) =>
        ({onFinish, onFinishFailed, onValueChange}: HandleFormCallbackOptions<T>) =>
                setCallback({onFinish, onFinishFailed, onValueChange})

export const handleFormFieldKeys =
        <T,>(setFieldKeys: (values?: (keyof T)[]) => void) =>
        (items?: FormItemProps[]) =>
                items && setFieldKeys(items.map(({name}) => name).filter(item => item) as (keyof T)[])

export const handleFormValidate = <T,>({rule, validatorOptions}: HandleFormValidateOptions) => {
        const {
                forbidNonWhitelisted = true,
                skipMissingProperties = true,
                whitelist = true,
                ...otherValidatorOptions
        } = validatorOptions ?? {}

        return (name?: keyof T) => async (value?: unknown) =>
                name && rule ?
                        validate(Object.assign(new rule(), {[name]: value}), {
                                forbidNonWhitelisted,
                                skipMissingProperties,
                                whitelist,
                                ...otherValidatorOptions
                        }).then(errors => (errors.length ? errors : undefined))
                :       ([] as ValidationError[])
}

export const renderFormItems =
        ({id, ...options}: RenderFormItemsOptions) =>
        (status: ComponentStatus) =>
        (items?: FormItemProps[]) =>
                status === 'succeeded' ?
                        items?.map((item, index) => (
                                <FormItem
                                        {...item}
                                        {...options}
                                        key={item.name ?? index}
                                        testID={`form__formItem--${id}`}
                                />
                        ))
                :       <></>
