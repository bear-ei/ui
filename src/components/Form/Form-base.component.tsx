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
	const runInitializeFormStateWithValuesEffect = useMemo(
		() => createStableHandlerWithState(initializeFormStateWithValues<T>(setInitialValues))(setState)(),
		[setInitialValues, setState]
	)

	const runRegisterFormCallbacksEffect = useMemo(
		() => createStableHandler(registerFormCallbacks<T>(setCallbacks))(),
		[setCallbacks]
	)

	const runExtractAndSetFormFieldKeysEffect = useMemo(
		() => createStableHandler(extractAndSetFormFieldKeys<T>(setFieldKeys))(),
		[setFieldKeys]
	)

	const formItemElements = useMemo(
		() => renderFormItems({validatorOptions, id})(status)(items),
		[id, items, status, validatorOptions]
	)

	useEffect(() => {
		runRegisterFormCallbacksEffect({onFinish, onFinishFailed, onValuesChange})
	}, [runRegisterFormCallbacksEffect, onFinish, onFinishFailed, onValuesChange])

	useEffect(() => {
		runExtractAndSetFormFieldKeysEffect(items)
	}, [runExtractAndSetFormFieldKeysEffect, items])

	useEffect(() => {
		runInitializeFormStateWithValuesEffect(initialValues)
	}, [runInitializeFormStateWithValuesEffect, initialValues])

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
