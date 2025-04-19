import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleFormCallback, handleFormFieldKeys, handleFormStatus, renderFormItems} from './Form-handle'
import type {FormBaseProps, FormState} from './Form.interface'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
	{
		form,
		initialValue,
		items,
		onFinish,
		onFinishFailed,
		onValueChange,
		renderForm,
		validatorOptions,
		...renderFormProps
	}: FormBaseProps<T>,
	ref: ForwardedRef<View>
) => {
	const [{status}, setState] = useImmer<FormState>({status: 'idle'})
	const id = useId()
	const formStore = useForm(form)
	const {setCallback, setInitialValue, setFieldKeys} = formStore
	const onFormCallback = useMemo(() => handleFormCallback<T>(setCallback), [setCallback])
	const onFormFieldKeys = useMemo(() => handleFormFieldKeys<T>(setFieldKeys), [setFieldKeys])
	const onFormStatus = useMemo(() => handleFormStatus<T>(setState)(setInitialValue), [setInitialValue, setState])
	const formItemElements = renderFormItems({validatorOptions, id})(status)(items)

	useEffect(() => {
		onFormCallback({onFinish, onFinishFailed, onValueChange})
	}, [onFinish, onFinishFailed, onFormCallback, onValueChange])

	useEffect(() => {
		onFormFieldKeys(items)
	}, [items, onFormFieldKeys])

	useEffect(() => {
		onFormStatus(initialValue)
	}, [initialValue, onFormStatus])

	if (status === 'idle') {
		return <></>
	}

	return renderForm({
		...renderFormProps,
		form: formStore,
		id,
		itemElements: formItemElements,
		ref
	})
}

export const FormBase = forwardRef(FormBaseInner) as typeof FormBaseInner
