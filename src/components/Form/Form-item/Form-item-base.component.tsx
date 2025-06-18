import type {ValidationError} from 'class-validator'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS} from '../../Common'
import type {FormErrors} from '../Form.interface'
import {useFormContext} from '../use-form-context.hook'
import {
	applyFormItemStatusInitToDraft,
	triggerFormItemShouldUpdate,
	updateFormFieldValueIfChanged,
	validateFormFieldOnBlur
} from './Form-item.handler'
import type {FormItemBaseProps, FormItemState} from './Form-item.interface'
import {RenderFormItem} from './Form-item.render'

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
	({labelText, name, renderControl, rule, validatorOptions, ...renderFormItemProps}, ref) => {
		const [{signOut, status}, setState] = useImmer<FormItemState>({
			shouldUpdate: {},
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const {getFieldsError, getFieldsValue, getInitialValues, setFieldsValue, signInField, validateFields} =
			useFormContext()

		const errors = getFieldsError(name) as ValidationError[]
		const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
		const storeValue = getFieldsValue(name)
		const value = storeValue ?? (status === COMPONENT_STATUS.IDLE ? getInitialValues(name) : storeValue)
		const onComponentUpdate = useMemo(() => triggerFormItemShouldUpdate(setState), [setState])
		const onValueChange = useMemo(
			() => updateFormFieldValueIfChanged({setFieldsValue, storeValue})(name),
			[name, setFieldsValue, storeValue]
		)

		const onBlur = useMemo(
			() =>
				validateFormFieldOnBlur(
					validateFields as (name?: string) => Promise<FormErrors<unknown>>
				)(name),
			[name, validateFields]
		)
		const runApplyStatusInitToDraft = useMemo(
			() =>
				applyFormItemStatusInitToDraft({
					onComponentUpdate,
					rule,
					signInField,
					validatorOptions
				})(setState),
			[onComponentUpdate, rule, setState, signInField, validatorOptions]
		)

		const controlElement = useMemo(
			() => renderControl?.({errorMessage, labelText, onBlur, onValueChange, value}),
			[errorMessage, labelText, onBlur, onValueChange, renderControl, value]
		)

		useEffect(() => {
			runApplyStatusInitToDraft(name)
		}, [runApplyStatusInitToDraft, name])

		useEffect(() => () => signOut?.(), [signOut])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderFormItem
				{...renderFormItemProps}
				controlElement={controlElement}
				id={id}
				ref={ref}
			/>
		)
	}
)
