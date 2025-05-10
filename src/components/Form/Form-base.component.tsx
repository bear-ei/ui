import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createHandler} from '../../utils'
import {handleFormCallbacks, handleFormFieldKeys, handleFormInit} from './Form-handle'
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
	const onFormCallbacks = useMemo(() => createHandler(handleFormCallbacks<T>(setCallbacks)), [setCallbacks])
	const onFormFieldKeys = useMemo(() => createHandler(handleFormFieldKeys<T>(setFieldKeys)), [setFieldKeys])
	const onFormInit = useMemo(
		() => createHandler(handleFormInit<T>(setState)(setInitialValues)),
		[setInitialValues, setState]
	)

	const formItemElements = useMemo(
		() => renderFormItems({validatorOptions, id})(status)(items),
		[id, items, status, validatorOptions]
	)

	useEffect(() => {
		onFormCallbacks({onFinish, onFinishFailed, onValuesChange})
	}, [onFinish, onFinishFailed, onFormCallbacks, onValuesChange])

	useEffect(() => {
		onFormFieldKeys(items)
	}, [items, onFormFieldKeys])

	useEffect(() => {
		onFormInit(initialValue)
	}, [initialValue, onFormInit])

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
