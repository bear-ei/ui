import type {NativeSyntheticEvent, TargetedEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {FormError} from '../Form.interface'
import type {FormItemState, HandleFormItemInitOptions, HandleFormItemValueChangeOptions} from './Form-item.interface'

export const handleFormItemValueChange =
	({setFieldsValue, storeValue}: HandleFormItemValueChangeOptions) =>
	(name?: string) =>
	(value?: unknown) =>
		name && storeValue !== value && setFieldsValue()({[name]: value})

export const handleComponentUpdate = (setState: Updater<FormItemState>) => () =>
	setState(draft => {
		draft.shouldUpdate = {}
	})

export const handleFormItemStatus =
	({rule, signInField, onComponentUpdate, validatorOptions}: HandleFormItemInitOptions) =>
	(setState: Updater<FormItemState>) =>
	(name?: string) =>
		setState(draft => {
			if (draft.status !== 'idle') {
				return
			}

			const {signOut} =
				signInField({name, onComponentUpdate, rule, touched: false, validatorOptions}) ?? {}

			draft.signOut = signOut
			draft.status = 'succeeded'
		})

export const handleFormItemBlur =
	(validateFields: (name?: string) => Promise<FormError<unknown>>) =>
	(name?: string) =>
	(_event: NativeSyntheticEvent<TargetedEvent>) => {
		if (name) {
			validateFields(name)
		}
	}
