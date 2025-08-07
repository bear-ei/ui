import {validate, ValidationError} from 'class-validator'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../Common'
import type {FormItemProps} from './Form-item'
import type {
	CreateFormFieldValidatorOptions,
	FormCallbacks,
	FormState,
	RegisterFormCallbacksOptions
} from './Form.interface'

export const initializeFormStateWithValues =
	<T,>(setInitialValues: (initialized?: boolean) => (values?: T) => void) =>
	(setState: Updater<FormState>) =>
	(values?: T) => {
		const nextInitialValuesEvent = () => values && setInitialValues()(values)

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			draft.status = COMPONENT_STATUS.SUCCEEDED
			draft.nextInitialValuesEvent = nextInitialValuesEvent
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
		:	([] as ValidationError[])
}
