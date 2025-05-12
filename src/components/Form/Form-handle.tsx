import {validate, ValidationError} from 'class-validator'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../Common'
import type {FormItemProps} from './Form-item'
import type {FormCallback, FormState, HandleFormCallbacksOptions, HandleFormValidateOptions} from './Form.interface'

export const handleFormInit =
	<T,>(setState: Updater<FormState>) =>
	(setInitialValues: (initialized?: boolean) => (value?: T) => void) =>
	(value?: T) =>
		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			if (value) {
				setInitialValues()(value)
			}

			draft.status = COMPONENT_STATUS.SUCCEEDED
		})

export const handleFormCallbacks =
	<T,>(setCallbacks: (callback: FormCallback<T>) => void) =>
	({onFinish, onFinishFailed, onValuesChange}: HandleFormCallbacksOptions<T>) =>
		setCallbacks({onFinish, onFinishFailed, onValuesChange})

export const handleFormFieldKeys =
	<T,>(setFieldKeys: (keys?: (keyof T)[]) => void) =>
	(items?: FormItemProps[]) =>
		items && setFieldKeys(items.map(({name}) => name).filter(Boolean) as (keyof T)[])

export const handleFormValidate = <T,>({rule, validatorOptions}: HandleFormValidateOptions) => {
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
		:	([] as ValidationError[])
}
