import type {NativeSyntheticEvent, TargetedEvent} from 'react-native'
import type {Updater} from 'use-immer'

import type {FormErrors} from '../Form.interface'
import type {
	ApplyFormItemStatusInitToDraftOptions,
	FormItemState,
	UpdateFormFieldValueIfChangedOptions
} from './Form-item.interface'

import {COMPONENT_STATUS} from '../../../constants'

export const applyFormItemStatusInitToDraft =
	(
		setState: Updater<FormItemState>,
		{onComponentUpdate, registerField, rule, validatorOptions}: ApplyFormItemStatusInitToDraftOptions
	) =>
	(name: string) => {
		const {unregister} = registerField({name, onComponentUpdate, rule, touched: false, validatorOptions}) ?? {}

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			draft.status = COMPONENT_STATUS.SUCCEEDED
		})

		return unregister
	}

export const updateFormFieldValueIfChanged =
	(name: string, {setFieldsValue, storeValue}: UpdateFormFieldValueIfChangedOptions) =>
	(value?: unknown) => {
		if (!(name && storeValue !== value)) {
			return
		}

		setFieldsValue({[name]: value})
	}

export const triggerFormItemUpdate = (setState: Updater<FormItemState>) => () =>
	setState(draft => {
		draft.renderToken = {}
	})

export const validateFormFieldOnBlur =
	(name: string, validateFields: (name: string) => Promise<FormErrors<unknown>>) =>
	(_event: NativeSyntheticEvent<TargetedEvent>) => {
		if (!name) {
			return
		}

		validateFields(name)
	}
