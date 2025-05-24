import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS} from '../Common'
import {extractAndSetFormFieldKeys, initializeFormStateWithValues, registerFormCallbacks} from './Form.handler'
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
	const runInitializeFormStateWithValues = useMemo(
		() => initializeFormStateWithValues<T>(setInitialValues)(setState),
		[setInitialValues, setState]
	)

	const runRegisterFormCallbacks = useMemo(() => registerFormCallbacks<T>(setCallbacks), [setCallbacks])
	const runExtractAndSetFormFieldKeys = useMemo(() => extractAndSetFormFieldKeys<T>(setFieldKeys), [setFieldKeys])
	const itemElements = useMemo(
		() => renderFormItems({validatorOptions, id})(status)(items),
		[id, items, status, validatorOptions]
	)

	useEffect(() => {
		runRegisterFormCallbacks({onFinish, onFinishFailed, onValuesChange})
	}, [runRegisterFormCallbacks, onFinish, onFinishFailed, onValuesChange])

	useEffect(() => {
		runExtractAndSetFormFieldKeys(items)
	}, [runExtractAndSetFormFieldKeys, items])

	useEffect(() => {
		runInitializeFormStateWithValues(initialValues)
	}, [runInitializeFormStateWithValues, initialValues])

	if (status === COMPONENT_STATUS.IDLE) {
		return <></>
	}

	return renderForm({
		...renderFormProps,
		form: formStore,
		id,
		itemElements,
		ref
	})
}

export const FormBase = forwardRef(FormBaseInner) as <T>(
	props: FormBaseProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof FormBaseInner>
