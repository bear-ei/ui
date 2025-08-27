import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
import {
	clearFormEvent,
	extractAndSetFormFieldKeys,
	initializeFormStateWithValues,
	registerFormCallbacks
} from './Form.handler'
import type {FormBaseProps, FormState} from './Form.interface'
import {RenderForm, RenderFormItems} from './Form.render'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
	{
		form,
		initialValues,
		items,
		onFinish,
		onFinishFailed,
		onValuesChange,
		validatorOptions,
		...renderFormProps
	}: FormBaseProps<T>,
	ref: ForwardedRef<View>
) => {
	const [{status, nextInitialValuesEvent}, setState] = useImmer<FormState>({status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const formStore = useForm(form)
	const {setCallbacks, setInitialValues, setFieldKeys} = formStore
	const runInitializeStateWithValues = useMemo(
		() => initializeFormStateWithValues<T>(setInitialValues)({setState, status}),
		[setInitialValues, setState, status]
	)

	const runRegisterCallbacks = useMemo(() => registerFormCallbacks<T>(setCallbacks), [setCallbacks])
	const runExtractAndSetFieldKeys = useMemo(() => extractAndSetFormFieldKeys<T>(setFieldKeys), [setFieldKeys])
	const runClearFormEvent = useMemo(() => createDeferredHandlerWithState(clearFormEvent)(setState)(), [setState])
	const itemElements = useMemo(
		() => (
			<RenderFormItems
				id={id}
				items={items}
				status={status}
				validatorOptions={validatorOptions}
			/>
		),
		[id, items, status, validatorOptions]
	)

	useEffect(() => {
		runRegisterCallbacks({onFinish, onFinishFailed, onValuesChange})
	}, [runRegisterCallbacks, onFinish, onFinishFailed, onValuesChange])

	useEffect(() => {
		runExtractAndSetFieldKeys(items)
	}, [runExtractAndSetFieldKeys, items])

	useEffect(() => {
		runInitializeStateWithValues(initialValues)
	}, [runInitializeStateWithValues, initialValues])

	useEffect(() => {
		runAfterInteractions(nextInitialValuesEvent)().done(() => runClearFormEvent('initial'))
	}, [nextInitialValuesEvent, runClearFormEvent])

	if (status === COMPONENT_STATUS.IDLE) {
		return <></>
	}

	return (
		<RenderForm
			{...renderFormProps}
			form={formStore}
			id={id}
			itemElements={itemElements}
			ref={ref}
		/>
	)
}

export const FormBase = forwardRef(FormBaseInner) as <T>(
	props: FormBaseProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof FormBaseInner>
