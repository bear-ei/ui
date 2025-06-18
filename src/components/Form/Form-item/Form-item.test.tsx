import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {type NativeSyntheticEvent, type TargetedEvent, Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import type {FormStore} from '../Form.interface'
import {FormContext} from '../use-form-context.hook'
import {FormItem} from './Form-item.component'
import type {FormItemControlProps} from './Form-item.interface'

describe('FormItem Component', () => {
	const mockGetFieldsError = jest.fn(() => [{constraints: {required: 'This field is required.'}}])
	const mockGetFieldsValue = jest.fn(() => undefined)
	const mockGetInitialValues = jest.fn(() => 'initial')
	const mockSetFieldsValue = jest.fn(() => jest.fn())
	const mockSignInField = jest.fn(() => ({signOut: jest.fn()}))
	const mockValidateFields = jest.fn()
	const mockContext = {
		getFieldsError: mockGetFieldsError,
		getFieldsValue: mockGetFieldsValue,
		getInitialValues: mockGetInitialValues,
		setFieldsValue: mockSetFieldsValue,
		signInField: mockSignInField,
		validateFields: mockValidateFields
	} as unknown as FormStore<Record<string, unknown>>

	const renderControl = ({value, errorMessage, onBlur, onValueChange}: FormItemControlProps) => (
		<Text
			onPress={() => onValueChange?.('newValue')}
			testID='formItem--control'
			onLongPress={() =>
				(onBlur as (event?: NativeSyntheticEvent<TargetedEvent>) => void | undefined)?.()
			}
		>
			{errorMessage ?? (value as string)}
		</Text>
	)

	it('should renders nothing when status is IDLE, then renders after init', async () => {
		const {getByTestId} = await renderWithAct(
			<FormContext.Provider value={mockContext}>
				<FormItem
					name='username'
					renderControl={renderControl}
					testID='formItem'
				/>
			</FormContext.Provider>
		)

		const {formItem, control} = await waitFor(() => ({
			control: getByTestId('formItem--control'),
			formItem: getByTestId('formItem')
		}))

		expect(control).toBeTruthy()
		expect(formItem).toBeTruthy()
	})

	it('should calls setFieldsValue on value change', async () => {
		const {getByTestId} = await renderWithAct(
			<FormContext.Provider value={mockContext}>
				<FormItem
					name='password'
					renderControl={renderControl}
					testID='form'
				/>
			</FormContext.Provider>
		)

		const control = await waitFor(() => getByTestId('formItem--control'))

		await act(async () => fireEvent.press(control))
		await waitFor(() => expect(mockSetFieldsValue).toHaveBeenCalled())
	})

	it('should displays error message from constraints', async () => {
		const {getByTestId} = await renderWithAct(
			<FormContext.Provider value={mockContext}>
				<FormItem
					name='email'
					renderControl={renderControl}
					testID='form'
				/>
			</FormContext.Provider>
		)

		const control = await waitFor(() => getByTestId('formItem--control'))

		expect(control.props.children).toContain('This field is required.')
	})

	it('should calls validateFields on blur', async () => {
		const {getByTestId} = await renderWithAct(
			<FormContext.Provider value={mockContext}>
				<FormItem
					name='email'
					renderControl={renderControl}
					testID='form'
				/>
			</FormContext.Provider>
		)

		const control = await waitFor(() => getByTestId('formItem--control'))

		await act(async () => fireEvent(control, 'longPress'))
		await waitFor(() => expect(mockValidateFields).toHaveBeenCalledWith('email'))
	})

	it('should calls signOut on unmount', async () => {
		const mockSignOut = jest.fn()

		mockSignInField.mockReturnValueOnce({signOut: mockSignOut})

		const {unmount, getByTestId} = await renderWithAct(
			<FormContext.Provider value={mockContext}>
				<FormItem
					name='logoutField'
					renderControl={renderControl}
					testID='formItem'
				/>
			</FormContext.Provider>
		)

		await waitFor(() => getByTestId('formItem'))

		unmount()
		expect(mockSignOut).toHaveBeenCalled()
	})
})
