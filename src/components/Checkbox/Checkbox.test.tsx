import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Checkbox} from './Checkbox.component'

describe('Checkbox Component', () => {
	it('should renders with default UNSELECTED state', async () => {
		const {getByTestId} = renderWithTheme(<Checkbox testID='checkbox-test' />)
		const checkboxIcon = await waitFor(() => getByTestId('checkbox__icon--blank--test-id'))

		expect(checkboxIcon).toBeTruthy()
	})

	it('should renders SELECTED when active=true', async () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='checkbox-test'
				active
			/>
		)

		const checkboxIcon = await waitFor(() => getByTestId('checkbox__icon--selected--test-id'))

		expect(checkboxIcon).toBeTruthy()
	})

	it('should renders INDETERMINATE when indeterminate=true', async () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='checkbox-test'
				indeterminate
			/>
		)

		const checkboxIcon = await waitFor(() => getByTestId('checkbox__icon--indeterminate--test-id'))

		expect(checkboxIcon).toBeTruthy()
	})

	it('should calls onActive with updated state when pressed', async () => {
		const onActive = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='checkbox-test'
				defaultActive={false}
				onActive={onActive}
			/>
		)

		const touchable = await waitFor(() => getByTestId('checkbox__touchable--test-id'))

		fireEvent(touchable, 'pressOut')
		await waitFor(() => expect(onActive).toHaveBeenCalledWith(true))
	})

	it('should does not call onActive when disabled', async () => {
		const onActive = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='checkbox-test'
				disabled
				onActive={onActive}
			/>
		)

		const touchable = await waitFor(() => getByTestId('checkbox__touchable--test-id'))

		fireEvent(touchable, 'pressOut')

		await waitFor(() => expect(onActive).not.toHaveBeenCalled())
	})
})
