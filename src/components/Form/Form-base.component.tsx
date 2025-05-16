import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
import {extractAndSetFormFieldKeys, initializeFormStateWithValues, registerFormCallbacks} from './Form.handle'
import type {FormBaseProps, FormState} from './Form.interface'
import {renderFormItems} from './Form.render'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
	{
		form,
		initialValues,
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
	const initializeFormStateWithValuesEffect = useMemo(
		() => createStableHandlerWithState(initializeFormStateWithValues<T>(setInitialValues))(setState)(),
		[setInitialValues, setState]
	)

	const registerFormCallbacksEffect = useMemo(
		() => createStableHandler(registerFormCallbacks<T>(setCallbacks))(),
		[setCallbacks]
	)

	const extractAndSetFormFieldKeysEffect = useMemo(
		() => createStableHandler(extractAndSetFormFieldKeys<T>(setFieldKeys))(),
		[setFieldKeys]
	)

	const formItemElements = useMemo(
		() => renderFormItems({validatorOptions, id})(status)(items),
		[id, items, status, validatorOptions]
	)

	useEffect(() => {
		registerFormCallbacksEffect({onFinish, onFinishFailed, onValuesChange})
	}, [onFinish, onFinishFailed, onValuesChange, registerFormCallbacksEffect])

	useEffect(() => {
		extractAndSetFormFieldKeysEffect(items)
	}, [extractAndSetFormFieldKeysEffect, items])

	useEffect(() => {
		initializeFormStateWithValuesEffect(initialValues)
	}, [initialValues, initializeFormStateWithValuesEffect])

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
