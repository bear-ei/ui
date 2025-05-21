import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../__test__'
import {FormItemProps} from './Form-item'
import {Form} from './Form.component'
import {FormStore} from './Form.interface'

describe('Form Component', () => {
	const mockSetCallbacks = jest.fn()
	const mockSetFieldKeys = jest.fn()
	const mockSetInitialValues = jest.fn(() => jest.fn())
	const mockForm = {
		getFieldEntities: () => [],
		getFieldEntitiesName: () => () => [],
		getFieldsError: () => ({}),
		getFieldsValue: () => 'value',
		getInitialValues: () => ({}),
		isFieldsTouched: undefined,
		resetFields: jest.fn(),
		setCallbacks: mockSetCallbacks,
		setFieldKeys: mockSetFieldKeys,
		setFieldsError: jest.fn(() => jest.fn()),
		setFieldsTouched: jest.fn(() => jest.fn()),
		setFieldsValidate: jest.fn(),
		setFieldsValue: jest.fn(() => jest.fn()),
		setInitialValues: mockSetInitialValues,
		signInField: jest.fn(),
		signOutFields: jest.fn(),
		submit: jest.fn(),
		validateFields: jest.fn(() => Promise.resolve({}))
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

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render items after status is SUCCEEDED', async () => {
		const {getAllByTestId} = await renderWithAct(
			<Form
				form={mockForm}
				initialValues={{username: 'admin', email: 'email'}}
				items={mockItems}
			/>
		)

		const items = await waitFor(() => getAllByTestId('form__formItem--test-id'))

		expect(items.length).toBe(2)
	})

	it('should register callbacks correctly', async () => {
		const {getAllByTestId} = await renderWithAct(
			<Form
				form={mockForm}
				items={mockItems}
				onFinish={jest.fn()}
				onFinishFailed={jest.fn()}
				onValuesChange={jest.fn()}
			/>
		)

		await waitFor(() => getAllByTestId('form__formItem--test-id'))

		expect(mockSetCallbacks).toHaveBeenCalled()
	})

	it('should initialize initial values correctly', async () => {
		const {getAllByTestId} = await renderWithAct(
			<Form
				form={mockForm}
				initialValues={{username: 'admin'}}
				items={mockItems}
			/>
		)

		await waitFor(() => getAllByTestId('form__formItem--test-id'))

		expect(mockSetInitialValues).toHaveBeenCalled()
	})

	it('should extract and set form field keys', async () => {
		const {getAllByTestId} = await renderWithAct(
			<Form
				form={mockForm}
				items={mockItems}
			/>
		)

		await waitFor(() => getAllByTestId('form__formItem--test-id'))

		expect(mockSetFieldKeys).toHaveBeenCalledWith(['username', 'email'])
	})

	it('should apply testID correctly', async () => {
		const {getByTestId} = await renderWithAct(
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
