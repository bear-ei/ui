import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleFormCallbacks, handleFormFieldKeys, handleFormStatus} from './Form-handle'
import type {FormBaseProps, FormState} from './Form.interface'
import {renderFormItems} from './Form.render'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
	{
		form,
		initialValue,
		items,
		onFinish,
		onFinishFailed,
		onValuesChange,
		renderForm,
		validatorOptions,
		...renderFormProps
	}: FormBaseProps<T>,
	ref: ForwardedRef<View>
) => {
	const [{status}, setState] = useImmer<FormState>({status: 'idle'})
	const id = useId()
	const formStore = useForm(form)
	const {setCallbacks, setInitialValues, setFieldKeys} = formStore
	const onFormCallbacks = useMemo(() => handleFormCallbacks<T>(setCallbacks), [setCallbacks])
	const onFormFieldKeys = useMemo(() => handleFormFieldKeys<T>(setFieldKeys), [setFieldKeys])
	const onFormStatus = useMemo(
		() => handleFormStatus<T>(setState)(setInitialValues),
		[setInitialValues, setState]
	)

	const formItemElements = renderFormItems({validatorOptions, id})(status)(items)

	useEffect(() => {
		onFormCallbacks({onFinish, onFinishFailed, onValuesChange})
	}, [onFinish, onFinishFailed, onFormCallbacks, onValuesChange])

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

export const FormBase = forwardRef(FormBaseInner) as <T>(
	props: FormBaseProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof FormBaseInner>
