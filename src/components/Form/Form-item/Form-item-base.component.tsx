import type {ValidationError} from 'class-validator'

import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {FormErrors} from '../Form.interface'
import type {FormItemBaseProps, FormItemState} from './Form-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useFormContext} from '../use-form-context.hook'
import {
	applyFormItemStatusInitToDraft,
	triggerFormItemShouldUpdate,
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
	const [{status}, setState] = useImmer<FormItemState>({shouldUpdate: {}, status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const {getFieldsError, getFieldsValue, getInitialValues, setFieldsValue, signInField, validateFields} =
		useFormContext()

	const errors = getFieldsError(name) as ValidationError[] | undefined
	const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
	const storeValue = getFieldsValue(name)
	const value = storeValue ?? (status === COMPONENT_STATUS.IDLE ? getInitialValues(name) : storeValue)
	const onComponentUpdate = useMemo(() => triggerFormItemShouldUpdate(setState), [setState])
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
				rule,
				signInField,
				validatorOptions
			}),
		[onComponentUpdate, rule, setState, signInField, validatorOptions]
	)

	const controlElement = useMemo(
		() => renderControl?.({errorMessage, labelText, onBlur, onValueChange, value}),
		[errorMessage, labelText, onBlur, onValueChange, renderControl, value]
	)

	useEffect(() => {
		const signOut = runApplyStatusInitToDraft(name)

		return () => signOut?.()
	}, [runApplyStatusInitToDraft, name])

	return (
		<RenderFormItem
			{...renderFormItemProps}
			controlElement={controlElement}
			id={id}
		/>
	)
}

