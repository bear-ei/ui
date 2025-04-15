import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useFormContext} from '../use-form-context.hook'
import {handleComponentUpdate, handleFormItemStatus, handleFormItemValueChange} from './Form-item-handle'
import type {FormItemBaseProps, FormItemState} from './Form-item.interface'

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
	({labelText, name, render, renderControl, rule, validatorOptions, ...renderProps}, ref) => {
		const [{signOut, status}, setState] = useImmer<FormItemState>({shouldUpdate: {}, status: 'idle'})
		const id = useId()
		const {getFieldsError, getFieldsValue, getInitialValues, setFieldValue, signInField} = useFormContext()
		const errors = getFieldsError(name)
		const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
		const onFormItemComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
		const storeValue = getFieldsValue(name)
		const value = useMemo(
			() => storeValue ?? (status === 'idle' ? getInitialValues(name) : storeValue),
			[getInitialValues, name, status, storeValue]
		)

		const onValueChange = handleFormItemValueChange({setFieldValue, storeValue})(name)
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

		const controlElement = renderControl?.({errorMessage, labelText, onValueChange, value})

		useEffect(() => {
			onFormItemStatus(name)
		}, [name, onFormItemStatus])

		useEffect(() => () => signOut?.(), [signOut])

		if (status === 'idle') {
			return <></>
		}

		return render({...renderProps, control: controlElement, ref, id})
	}
)
