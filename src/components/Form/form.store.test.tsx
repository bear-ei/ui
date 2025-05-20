import {waitFor} from '@testing-library/react-native'
import {ValidationError} from 'class-validator'
import {FormStore} from './Form.interface'
import {formStore} from './form.store'

interface TestForm {
	[key: string]: unknown
	email?: string
	username?: string
}

describe('formStore', () => {
	let store = formStore<TestForm>()
	const updateMock = jest.fn()

	beforeEach(() => {
		store = formStore<TestForm>()
		store.setFieldKeys(['username', 'email'])
		store.signInField({
			name: 'username',
			onComponentUpdate: updateMock,
			touched: false
		})

		store.signInField({
			name: 'email',
			onComponentUpdate: updateMock,
			touched: false
		})
	})

	it('should set and get initial values correctly', () => {
		store.setInitialValues()({username: 'testUser', email: 'test@example.com'})

		expect(store.getInitialValues()).toEqual({username: 'testUser', email: 'test@example.com'})
	})

	it('should set and get field values correctly', async () => {
		store.setFieldsValue()({username: 'John'})

		expect(store.getFieldsValue('username')).toBe('John')
	})

	it('should reset fields properly', () => {
		store.setInitialValues()({username: 'resetUser'})
		store.setFieldsValue()({username: 'changedUser'})
		store.resetFields(['username'])

		expect(store.getFieldsValue('username')).toBeUndefined()
	})

	it('should register field entity and update touched state', () => {
		store.setFieldsTouched(true)('username')

		expect(store.isFieldsTouched(['username'])).toBe(true)
	})

	it('should store and return errors correctly', () => {
		const error: ValidationError = {
			property: 'username',
			constraints: {isEmail: 'Invalid email'},
			children: []
		}

		store.setFieldsError()({username: [error]})

		expect(store.getFieldsError('username')).toEqual([error])
	})

	it('should call onFinish callback when submit succeeds', async () => {
		const onFinish = jest.fn()

		store.setCallbacks({onFinish})
		store.setFieldsValue()({username: 'valid'})
		store.submit(false)

		expect(onFinish).toHaveBeenCalledWith({username: 'valid'})
	})

	it('should call onFinishFailed when validation fails', async () => {
		const error: ValidationError = {
			property: 'username',
			constraints: {required: 'Required'},
			children: []
		}

		const mockValidateFields = jest
			.fn()
			.mockResolvedValue({username: [error]}) as FormStore<TestForm>['validateFields']

		store = formStore<TestForm>({validateFields: mockValidateFields})
		const onFinishFailed = jest.fn()

		store.setCallbacks({onFinishFailed})
		store.setFieldKeys(['username'])
		store.signInField({name: 'username', onComponentUpdate: jest.fn(), touched: false})
		store.setFieldsValue()({username: ''})
		store.submit()

		await waitFor(() => expect(onFinishFailed).toHaveBeenCalledWith({username: [error]}))
	})
})
