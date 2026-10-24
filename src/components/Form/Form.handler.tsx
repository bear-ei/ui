import type {FormItemProps} from './Form-item'
import type {FormCallbacks, InitializeFormStateWithValuesOptions, RegisterFormCallbacksOptions} from './Form.interface'

import {COMPONENT_STATUS} from '../../constants'

export const initializeFormStateWithValues =
	<T,>(setInitialValues: (values?: T) => void, {setState, status}: InitializeFormStateWithValuesOptions) =>
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

export const extractAndSetFormFieldKeys = (setFieldKeys: (keys?: string[]) => void) => (fields?: FormItemProps[]) => {
	if (!fields) {
		return
	}

	setFieldKeys(fields.map(({name}) => name).filter(Boolean))
}
