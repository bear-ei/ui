import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Checkbox} from './Checkbox.component'

describe('Checkbox', () => {
	it('should render as unselected by default', () => {
		const {getByTestId} = renderWithTheme(<Checkbox testID='cb-1' />)

		expect(getByTestId('checkbox__iconLayout--blank--test-id')).toBeTruthy()
	})

	it('should render selected icon when active=true', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				active
				testID='cb-2'
			/>
		)

		expect(getByTestId('checkbox__iconLayout--selected--test-id')).toBeTruthy()
	})

	it('should render indeterminate icon when indeterminate=true', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				indeterminate
				testID='cb-3'
			/>
		)

		expect(getByTestId('checkbox__iconLayout--indeterminate--test-id')).toBeTruthy()
	})

	it('should call onActive(true) when toggled from false to true', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				defaultActive={false}
				onActive={mockFn}
				testID='cb-4'
			/>
		)

		const touchable = getByTestId('checkbox__touchable--test-id')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).toHaveBeenCalledWith(true)
		})
	})

	it('should call onActive(false) when toggled from true to false', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				defaultActive={true}
				onActive={mockFn}
				testID='cb-5'
			/>
		)

		const touchable = getByTestId('checkbox__touchable--test-id')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).toHaveBeenCalledWith(false)
		})
	})

	it('should not call onActive when disabled', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				defaultActive={false}
				disabled
				onActive={mockFn}
				testID='cb-6'
			/>
		)

		const touchable = getByTestId('checkbox__touchable--test-id')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).not.toHaveBeenCalled()
		})
	})

	it('should handle error state icon fill correctly', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				active
				error
				testID='cb-7'
			/>
		)

		expect(getByTestId('checkbox__iconLayout--selected--test-id')).toBeTruthy()
	})
})
