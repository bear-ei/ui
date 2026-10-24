import type {ValidationError} from 'class-validator'

import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {FormErrors} from '../Form.interface'
import type {FormItemBaseProps, FormItemState} from './Form-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useFormContext} from '../use-form-context.hook'
import {
	applyFormItemStatusInitToDraft,
	triggerFormItemUpdate,
	updateFormFieldValueIfChanged,
	validateFormFieldOnBlur
} from './Form-item.handler'
import {RenderFormItem} from './Form-item.render'

export const FormItemBase: FC<FormItemBaseProps> = ({
	labelText,
	name,
	renderControl,
	rule,
	validatorOptions,
	...renderFormItemProps
}) => {
	const [{status}, setState] = useImmer<FormItemState>({renderToken: {}, status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const {getFieldsError, getFieldsValue, getInitialValues, registerField, setFieldsValue, validateFields} =
		useFormContext()

	const errors = getFieldsError(name) as ValidationError[] | undefined
	const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
	const storeValue = getFieldsValue(name)
	const value = storeValue ?? (status === COMPONENT_STATUS.IDLE ? getInitialValues(name) : storeValue)
	const onComponentUpdate = useMemo(() => triggerFormItemUpdate(setState), [setState])
	const onValueChange = useMemo(
		() => updateFormFieldValueIfChanged(name, {setFieldsValue, storeValue}),
		[name, setFieldsValue, storeValue]
	)

	const onBlur = useMemo(
		() => validateFormFieldOnBlur(name, validateFields as (name: string) => Promise<FormErrors<unknown>>),
		[name, validateFields]
	)
	const runApplyStatusInitToDraft = useMemo(
		() =>
			applyFormItemStatusInitToDraft(setState, {
				onComponentUpdate,
				registerField,
				rule,
				validatorOptions
			}),
		[onComponentUpdate, rule, setState, registerField, validatorOptions]
	)

	const controlElement = renderControl?.({errorMessage, labelText, onBlur, onValueChange, value})

	useEffect(() => {
		const unregister = runApplyStatusInitToDraft(name)

		return () => unregister?.()
	}, [runApplyStatusInitToDraft, name])

	return (
		<RenderFormItem
			{...renderFormItemProps}
			controlElement={controlElement}
			id={id}
		/>
	)
}
