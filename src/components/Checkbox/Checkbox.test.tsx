import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Checkbox} from './Checkbox.component'

describe('Checkbox Component', () => {
	it('should renders with default UNSELECTED state', async () => {
		const {getByTestId} = renderWithTheme(<Checkbox testID='checkbox-test' />)
		const icon = await waitFor(() => getByTestId('checkbox__icon--blank--test-id'))

		expect(icon).toBeTruthy()
	})

	it('should renders SELECTED when active=true', async () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				active
				testID='checkbox-test'
			/>
		)

		const icon = await waitFor(() => getByTestId('checkbox__icon--selected--test-id'))

		expect(icon).toBeTruthy()
	})

	it('should renders INDETERMINATE when indeterminate=true', async () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				indeterminate
				testID='checkbox-test'
			/>
		)

		const icon = await waitFor(() => getByTestId('checkbox__icon--indeterminate--test-id'))

		expect(icon).toBeTruthy()
	})

	it('should calls onActive with updated state when pressed', async () => {
		const onActive = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				defaultActive={false}
				onActive={onActive}
				testID='checkbox-test'
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
				disabled
				onActive={onActive}
				testID='checkbox-test'
			/>
		)

		const touchable = await waitFor(() => getByTestId('checkbox__touchable--test-id'))

		fireEvent(touchable, 'pressOut')
		await waitFor(() => expect(onActive).not.toHaveBeenCalled())
	})
})
