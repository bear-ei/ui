import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import {useFormContext} from '../use-form-context.hook'
import {
	applyFormItemStatusInitToDraft,
	triggerFormItemShouldUpdate,
	updateFormFieldValueIfChanged,
	validateFormFieldOnBlur
} from './Form-item.handle'
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
			() => createStableHandlerWithState(triggerFormItemShouldUpdate)(setState)(),
			[setState]
		)

		const onFormItemValueChange = useMemo(
			() => createStableHandler(updateFormFieldValueIfChanged({setFieldsValue, storeValue})(name))(),
			[name, setFieldsValue, storeValue]
		)

		const onFormItemBlur = useMemo(
			() => createStableHandler(validateFormFieldOnBlur(validateFields)(name))(),
			[name, validateFields]
		)

		const runFormItemStatusInitToDraftEffect = useMemo(
			() =>
				applyFormItemStatusInitToDraft({
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
					onValueChange: onFormItemValueChange,
					value
				}),
			[errorMessage, labelText, onFormItemBlur, onFormItemValueChange, renderControl, value]
		)

		useEffect(() => {
			runFormItemStatusInitToDraftEffect(name)
		}, [runFormItemStatusInitToDraftEffect, name])

		useEffect(() => () => signOut?.(), [signOut])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderFormItem({...renderFormItemProps, controlElement, ref, id})
	}
)
