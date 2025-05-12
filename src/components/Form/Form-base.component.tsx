import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createHandler, createHandlerFinal} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
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
	const [{status}, setState] = useImmer<FormState>({status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const formStore = useForm(form)
	const {setCallbacks, setInitialValues, setFieldKeys} = formStore
	const onFormStatus = useMemo(
		() => createHandler(handleFormStatus<T>(setInitialValues))(setState)(),
		[setInitialValues, setState]
	)

	const onFormCallbacks = useMemo(
		() => createHandlerFinal(handleFormCallbacks<T>(setCallbacks))(),
		[setCallbacks]
	)

	const onFormFieldKeys = useMemo(
		() => createHandlerFinal(handleFormFieldKeys<T>(setFieldKeys))(),
		[setFieldKeys]
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
		onFormStatus(initialValue)
	}, [initialValue, onFormStatus])

	if (status === COMPONENT_STATUS.IDLE) {
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
