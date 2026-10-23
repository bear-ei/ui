import {useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'

import type {FormBaseProps, FormState} from './Form.interface'

import {COMPONENT_STATUS} from '../../constants'
import {extractAndSetFormFieldKeys, initializeFormStateWithValues, registerFormCallbacks} from './Form.handler'
import {RenderForm, RenderFormItems} from './Form.render'
import {useForm} from './use-form.hook'

export const FormBase = ({
	form,
	initialValues,
	items,
	onFinish,
	onFinishFailed,
	onValuesChange,
	validatorOptions,
	...renderFormProps
}: FormBaseProps) => {
	const [{status}, setState] = useImmer<FormState>({status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const formStore = useForm<Record<string, unknown>>(form)
	const {setCallbacks, setFieldKeys, setInitialValues} = formStore
	const runInitializeStateWithValues = useMemo(
		() => initializeFormStateWithValues(setInitialValues, {setState, status}),
		[setInitialValues, setState, status]
	)

	const runRegisterCallbacks = useMemo(() => registerFormCallbacks(setCallbacks), [setCallbacks])
	const runExtractAndSetFieldKeys = useMemo(() => extractAndSetFormFieldKeys(setFieldKeys), [setFieldKeys])
	const itemElements = (
		<RenderFormItems
			id={id}
			items={items}
			status={status}
			validatorOptions={validatorOptions}
		/>
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

	return (
		<RenderForm
			{...renderFormProps}
			form={formStore}
			id={id}
			itemElements={itemElements}
			status={status}
		/>
	)
}
