import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createHandler, createHandlerWithUpdater} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import {useFormContext} from '../use-form-context.hook'
import {
	handleComponentUpdate,
	handleFormItemBlur,
	handleFormItemStatus,
	handleFormItemValueChange
} from './Form-item-handle'
import type {FormItemBaseProps, FormItemState} from './Form-item.interface'

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
	({labelText, name, renderControl, renderFormItem, rule, validatorOptions, ...renderFormItemProps}, ref) => {
		const [{signOut, status}, setState] = useImmer<FormItemState>({
			shouldUpdate: {},
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const {getFieldsError, getFieldsValue, getInitialValues, setFieldsValue, signInField, validateFields} =
			useFormContext()

		const errors = getFieldsError(name)
		const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
		const storeValue = getFieldsValue(name)
		const value = storeValue ?? (status === COMPONENT_STATUS.IDLE ? getInitialValues(name) : storeValue)
		const onFormItemComponentUpdate = useMemo(
			() => createHandlerWithUpdater(handleComponentUpdate)(setState)(),
			[setState]
		)

		const onFormValueChange = useMemo(
			() => createHandler(handleFormItemValueChange({setFieldsValue, storeValue})(name))(),
			[name, setFieldsValue, storeValue]
		)

		const onFormItemBlur = useMemo(
			() => createHandler(handleFormItemBlur(validateFields)(name))(),
			[name, validateFields]
		)

		const onFormItemStatus = useMemo(
			() =>
				handleFormItemStatus({
					onComponentUpdate: onFormItemComponentUpdate,
					rule,
					signInField,
					validatorOptions
				})(setState),
			[onFormItemComponentUpdate, rule, setState, signInField, validatorOptions]
		)

		const controlElement = useMemo(
			() =>
				renderControl?.({
					errorMessage,
					labelText,
					onBlur: onFormItemBlur,
					onValueChange: onFormValueChange,
					value
				}),
			[errorMessage, labelText, onFormItemBlur, onFormValueChange, renderControl, value]
		)

		useEffect(() => {
			onFormItemStatus(name)
		}, [name, onFormItemStatus])

		useEffect(() => () => signOut?.(), [signOut])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderFormItem({...renderFormItemProps, control: controlElement, ref, id})
	}
)
