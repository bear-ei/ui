import {fireEvent, waitFor} from '@testing-library/react-native'
import React, {forwardRef, useImperativeHandle} from 'react'
import {Text, TextInput} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {Form} from '../Form.component'

describe('FormItem', () => {
	const TestForm = forwardRef<
		{
			form: ReturnType<typeof Form.useForm<{username: string}>>
		},
		{initialValue?: {username: string}}
	>(({initialValue}, ref) => {
		const form = Form.useForm<{username: string}>()

		useImperativeHandle(ref, () => ({
			form
		}))

		return (
			<Form
				form={form}
				initialValue={initialValue}
				items={[
					{
						name: 'username',
						renderControl: ({value, onValueChange, errorMessage}) => (
							<>
								<TextInput
									testID='formItem__input'
									value={value as string}
									onChangeText={onValueChange}
								/>
								{errorMessage && <Text>{errorMessage}</Text>}
							</>
						)
					}
				]}
				testID='form'
			/>
		)
	})

	it('should render FormItem with initial value', async () => {
		const ref = React.createRef<{form: ReturnType<typeof Form.useForm<{username: string}>>}>()
		const {getByTestId} = renderWithTheme(
			<TestForm
				ref={ref}
				initialValue={{username: 'Jack'}}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('formItem__input').props.value).toBe('Jack')
		})
	})

	it('should update field value on input change', async () => {
		const ref = React.createRef<{form: ReturnType<typeof Form.useForm<{username: string}>>}>()
		const {getByTestId} = renderWithTheme(
			<TestForm
				ref={ref}
				initialValue={{username: 'Jack'}}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('formItem__input').props.value).toBe('Jack')
		})

		fireEvent.changeText(getByTestId('formItem__input'), 'Rose')

		await waitFor(() => {
			expect(ref.current?.form.getFieldsValue('username')).toBe('Rose')
		})
	})

	it('should clean up field when unmounted', async () => {
		const ref = React.createRef<{form: ReturnType<typeof Form.useForm<{username: string}>>}>()
		const {unmount, getByTestId} = renderWithTheme(
			<TestForm
				ref={ref}
				initialValue={{username: 'Jack'}}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('formItem__input')).toBeTruthy()
		})

		ref.current?.form.validateFields('username')

		unmount()

		await waitFor(() => {
			expect(ref.current?.form.getFieldsValue('username')).toBeUndefined()
		})
	})
})
