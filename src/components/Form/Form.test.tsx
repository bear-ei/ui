import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {FormItemProps} from './Form-item'
import {Form} from './Form.component'
import {FormStore} from './Form.interface'

describe('Form Component', () => {
	const mockSetCallbacks = jest.fn()
	const mockSetInitialValues = jest.fn(() => jest.fn())
	const mockSetFieldKeys = jest.fn()
	const mockForm = {
		setCallbacks: mockSetCallbacks,
		setInitialValues: mockSetInitialValues,
		setFieldKeys: mockSetFieldKeys,
		getFieldEntities: () => [],
		getFieldEntitiesName: () => () => [],
		getFieldsError: () => ({}),
		getFieldsValue: () => 'value',
		getInitialValues: () => ({}),
		resetFields: jest.fn(),
		setFieldsError: jest.fn(() => jest.fn()),
		setFieldsTouched: jest.fn(() => jest.fn()),
		setFieldsValidate: jest.fn(),
		setFieldsValue: jest.fn(() => jest.fn()),
		signInField: jest.fn(),
		signOutFields: jest.fn(),
		submit: jest.fn(),
		validateFields: jest.fn(() => Promise.resolve({})),
		isFieldsTouched: undefined
	} as unknown as FormStore

	const mockItems = [
		{
			name: 'username',
			renderControl: ({value}) => <Text testID='control-username'>{value as string}</Text>
		},
		{
			name: 'email',
			renderControl: ({value}) => <Text testID='control-email'>{value as string}</Text>
		}
	] as FormItemProps[]

	it('should render items after status is SUCCEEDED', async () => {
		const {getAllByTestId} = renderWithTheme(
			<Form
				form={mockForm}
				items={mockItems}
				initialValues={{username: 'admin', email: 'email'}}
			/>
		)

		const items = await waitFor(() => getAllByTestId(/form__formItem--/))

		expect(items.length).toBe(2)
	})

	it('should register callbacks correctly', async () => {
		const {getAllByTestId} = renderWithTheme(
			<Form
				form={mockForm}
				items={mockItems}
				onFinish={jest.fn()}
				onFinishFailed={jest.fn()}
				onValuesChange={jest.fn()}
			/>
		)

		await waitFor(() => getAllByTestId(/form__formItem--/))

		expect(mockSetCallbacks).toHaveBeenCalled()
	})

	it('should initialize initial values correctly', async () => {
		const {getAllByTestId} = renderWithTheme(
			<Form
				form={mockForm}
				items={mockItems}
				initialValues={{username: 'admin'}}
			/>
		)

		await waitFor(() => getAllByTestId(/form__formItem--/))

		expect(mockSetInitialValues).toHaveBeenCalled()
	})

	it('should extract and set form field keys', async () => {
		const {getAllByTestId} = renderWithTheme(
			<Form
				form={mockForm}
				items={mockItems}
			/>
		)

		await waitFor(() => getAllByTestId(/form__formItem--/))

		expect(mockSetFieldKeys).toHaveBeenCalledWith(['username', 'email'])
	})

	it('should apply testID correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Form
				form={mockForm}
				items={mockItems}
				testID='custom-form'
			/>
		)

		const form = await waitFor(() => getByTestId('custom-form'))

		expect(form).toBeTruthy()
	})
})
