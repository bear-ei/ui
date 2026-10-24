import {useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'

import type {FormBaseProps, FormState} from './Form.interface'

import {COMPONENT_STATUS} from '../../constants'
import {extractAndSetFormFieldKeys, initializeFormStateWithValues, registerFormCallbacks} from './Form.handler'
import {RenderForm, RenderFormFields} from './Form.render'
import {useForm} from './use-form.hook'

export const FormBase = ({
	fields,
	form,
	initialValues,
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
	const fieldElements = (
		<RenderFormFields
			fields={fields}
			id={id}
			status={status}
			validatorOptions={validatorOptions}
		/>
	)

	useEffect(() => {
		runRegisterCallbacks({onFinish, onFinishFailed, onValuesChange})
	}, [runRegisterCallbacks, onFinish, onFinishFailed, onValuesChange])

	useEffect(() => {
		runExtractAndSetFieldKeys(fields)
	}, [runExtractAndSetFieldKeys, fields])

	useEffect(() => {
		runInitializeStateWithValues(initialValues)
	}, [runInitializeStateWithValues, initialValues])

	return (
		<RenderForm
			{...renderFormProps}
			fieldElements={fieldElements}
			form={formStore}
			id={id}
			status={status}
		/>
	)
}
