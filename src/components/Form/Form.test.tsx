import {act, waitFor} from '@testing-library/react-native'
import React, {forwardRef, useImperativeHandle} from 'react'
import {renderWithTheme} from '../../../__test__'
import {Form} from './Form.component'

describe('Form', () => {
	it('should render form items and call onFinish using form instance', async () => {
		const handleFinish = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()

			useImperativeHandle(ref, () => ({
				submit: () => form.submit(true) // skip validate
			}))

			return (
				<Form
					form={form}
					initialValue={{name: 'Jack'}}
					items={[{name: 'name'}]}
					onFinish={handleFinish}
					testID='test-form'
				/>
			)
		})

		const testFormRef = React.createRef<{submit: () => void}>()
		const {getAllByTestId} = renderWithTheme(<TestForm ref={testFormRef} />)

		await waitFor(() => {
			expect(getAllByTestId('formItem--test-form')).toHaveLength(1)
		})

		testFormRef.current?.submit()
		await waitFor(() => {
			expect(handleFinish).toHaveBeenCalledWith({name: 'Jack'})
		})
	})

	it('should trigger onValueChange and resetFields properly', async () => {
		const onValueChange = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()

			useImperativeHandle(ref, () => ({
				changeValue: () => form.setFieldValue()({age: 18}),
				reset: () => form.resetFields()
			}))

			return (
				<Form
					form={form}
					items={[{name: 'age'}]}
					onValueChange={onValueChange}
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
			expect(onValueChange).toHaveBeenCalledWith({
				changedValue: {age: 18},
				value: {age: 18}
			})
		})

		await act(async () => {
			ref.current?.reset()
		})

		await waitFor(() => {
			expect(onValueChange).toHaveBeenCalledWith({
				changedValue: {age: undefined},
				value: {age: undefined}
			})
		})
	})

	it('should call onFinishFailed when validation fails', async () => {
		const handleFailed = jest.fn()
		const TestForm = forwardRef((_, ref) => {
			const form = Form.useForm<Record<string, unknown>>()

			form.setFieldKeys(['email'])
			form.signInField({
				name: 'email',
				touched: true,
				onComponentUpdate: () => {}
			})

			useImperativeHandle(ref, () => ({
				submit: () => form.submit()
			}))

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
