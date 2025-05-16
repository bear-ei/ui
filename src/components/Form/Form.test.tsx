import {act, waitFor} from '@testing-library/react-native'
import React, {forwardRef, useImperativeHandle} from 'react'
import {renderWithTheme} from '../../../__test__'
import {Form} from './Form.component'

describe('Form', () => {
	it('should render form items and call onFinish using form instance', async () => {
		const handleFinish = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()
			const submit = () => form.submit(true)

			useImperativeHandle(ref, () => ({submit}))

			return (
				<Form
					form={form}
					initialValues={{name: 'Jack'}}
					items={[{name: 'name'}]}
					onFinish={handleFinish}
					testID='test-form'
				/>
			)
		})

		const testFormRef = React.createRef<{submit: () => void}>()
		const {getAllByTestId} = renderWithTheme(<TestForm ref={testFormRef} />)

		await waitFor(() => {
			expect(getAllByTestId('form__formItem--test-id')).toHaveLength(1)
		})

		testFormRef.current?.submit()
		await waitFor(() => {
			expect(handleFinish).toHaveBeenCalledWith({name: 'Jack'})
		})
	})

	it('should trigger onValueChange and resetFields properly', async () => {
		const onValuesChange = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()
			const changeValue = () => form.setFieldsValue()({age: 18})
			const reset = () => form.resetFields()

			useImperativeHandle(ref, () => ({changeValue, reset}))

			return (
				<Form
					form={form}
					items={[{name: 'age'}]}
					onValuesChange={onValuesChange}
					testID='test-form'
				/>
			)
		})

		const ref = React.createRef<{changeValue: () => void; reset: () => void}>()

		renderWithTheme(<TestForm ref={ref} />)
		await act(async () => {
			ref.current?.changeValue()
		})

		await waitFor(() => {
			expect(onValuesChange).toHaveBeenCalledWith({
				changedValue: {age: 18},
				value: {age: 18}
			})
		})

		await act(async () => {
			ref.current?.reset()
		})

		await waitFor(() => {
			expect(onValuesChange).toHaveBeenCalledWith({
				changedValue: {age: undefined},
				value: {age: undefined}
			})
		})
	})

	it('should call onFinishFailed when validation fails', async () => {
		const handleFailed = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()
			const submit = () => form.submit()

			form.setFieldKeys(['email'])
			form.signInField({
				name: 'email',
				touched: true,
				onComponentUpdate: () => {}
			})

			useImperativeHandle(ref, () => ({submit}))

			return (
				<Form
					form={form}
					items={[{name: 'email'}]}
					onFinishFailed={handleFailed}
					testID='test-form'
				/>
			)
		})

		const ref = React.createRef<{submit: () => void}>()

		renderWithTheme(<TestForm ref={ref} />)
		ref.current?.submit()
		await waitFor(() => {
			expect(handleFailed).toHaveBeenCalled()
		})
	})
})
