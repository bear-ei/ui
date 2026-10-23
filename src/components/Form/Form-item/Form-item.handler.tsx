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
		{onComponentUpdate, rule, signInField, validatorOptions}: ApplyFormItemStatusInitToDraftOptions
	) =>
	(name: string) => {
		const {signOut} = signInField({name, onComponentUpdate, rule, touched: false, validatorOptions}) ?? {}

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			draft.status = COMPONENT_STATUS.SUCCEEDED
		})

		return signOut
	}

export const updateFormFieldValueIfChanged =
	(name: string, {setFieldsValue, storeValue}: UpdateFormFieldValueIfChangedOptions) =>
	(value?: unknown) => {
		if (!(name && storeValue !== value)) {
			return
		}

		setFieldsValue({[name]: value})
	}

export const triggerFormItemShouldUpdate = (setState: Updater<FormItemState>) => () =>
	setState(draft => {
		draft.shouldUpdate = {}
	})

export const validateFormFieldOnBlur =
	(name: string, validateFields: (name: string) => Promise<FormErrors<unknown>>) =>
	(_event: NativeSyntheticEvent<TargetedEvent>) => {
		if (!name) {
			return
		}

		validateFields(name)
	}
