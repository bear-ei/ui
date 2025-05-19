import {fireEvent, waitFor} from '@testing-library/react-native'
import {NativeSyntheticEvent, TargetedEvent, Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {FormStore} from '../Form.interface'
import {FormContext} from '../use-form-context.hook'
import {FormItem} from './Form-item.component'
import {FormItemControlProps} from './Form-item.interface'

describe('FormItem Component', () => {
	const mockSetFieldsValue = jest.fn(() => jest.fn())
	const mockValidateFields = jest.fn()
	const mockSignInField = jest.fn(() => ({signOut: jest.fn()}))
	const mockGetInitialValues = jest.fn(() => 'initial')
	const mockGetFieldsValue = jest.fn(() => undefined)
	const mockGetFieldsError = jest.fn(() => [{constraints: {required: 'This field is required.'}}])
	const mockContext = {
		setFieldsValue: mockSetFieldsValue,
		validateFields: mockValidateFields,
		signInField: mockSignInField,
		getInitialValues: mockGetInitialValues,
		getFieldsValue: mockGetFieldsValue,
		getFieldsError: mockGetFieldsError
	} as unknown as FormStore<Record<string, unknown>>

	const renderControl = ({value, errorMessage, onBlur, onValueChange}: FormItemControlProps) => (
		<Text
			testID='formItem--control'
			onPress={() => onValueChange?.('newValue')}
			onLongPress={() =>
				(onBlur as (event?: NativeSyntheticEvent<TargetedEvent>) => void | undefined)?.()
			}
		>
			{errorMessage ?? (value as string)}
		</Text>
	)

	it('should renders nothing when status is IDLE, then renders after init', async () => {
		const {getByTestId} = renderWithTheme(
			<FormContext.Provider value={mockContext}>
				<FormItem
					testID='formItem'
					name='username'
					renderControl={renderControl}
				/>
			</FormContext.Provider>
		)

		const {formItem, formItemControl} = await waitFor(() => ({
			formItem: getByTestId('formItem'),
			formItemControl: getByTestId('formItem--control')
		}))

		expect(formItem).toBeTruthy()
		expect(formItemControl).toBeTruthy()
	})

	it('should calls setFieldsValue on value change', async () => {
		const {getByTestId} = renderWithTheme(
			<FormContext.Provider value={mockContext}>
				<FormItem
					testID='form'
					name='password'
					renderControl={renderControl}
				/>
			</FormContext.Provider>
		)

		const formItemControl = await waitFor(() => getByTestId('formItem--control'))

		fireEvent.press(formItemControl)

		await waitFor(() => expect(mockSetFieldsValue).toHaveBeenCalled())
	})

	it('should displays error message from constraints', async () => {
		const {getByTestId} = renderWithTheme(
			<FormContext.Provider value={mockContext}>
				<FormItem
					testID='form'
					name='email'
					renderControl={renderControl}
				/>
			</FormContext.Provider>
		)

		const formItemControl = await waitFor(() => getByTestId('formItem--control'))

		expect(formItemControl.props.children).toContain('This field is required.')
	})

	it('should calls validateFields on blur', async () => {
		const {getByTestId} = renderWithTheme(
			<FormContext.Provider value={mockContext}>
				<FormItem
					testID='form'
					name='email'
					renderControl={renderControl}
				/>
			</FormContext.Provider>
		)

		const formItemControl = await waitFor(() => getByTestId('formItem--control'))

		fireEvent(formItemControl, 'longPress')

		await waitFor(() => expect(mockValidateFields).toHaveBeenCalledWith('email'))
	})

	it('should calls signOut on unmount', async () => {
		const mockSignOut = jest.fn()
		mockSignInField.mockReturnValueOnce({signOut: mockSignOut})

		const {unmount, getByTestId} = renderWithTheme(
			<FormContext.Provider value={mockContext}>
				<FormItem
					testID='formItem'
					name='logoutField'
					renderControl={renderControl}
				/>
			</FormContext.Provider>
		)

		await waitFor(() => getByTestId('formItem'))

		unmount()
		expect(mockSignOut).toHaveBeenCalled()
	})
})
