import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../../__test__'
import {ListAfterAffordance} from './List-after-affordance.component'

describe('ListAfterAffordance', () => {
	it('renders both confirm and cancel buttons by default', async () => {
		const {getByTestId} = renderWithTheme(
			<ListAfterAffordance
				visible
				indexKey='item-1'
			/>
		)

		const {listAffordanceButtonConfirmed, listAffordanceButtonClose} = await waitFor(() => ({
			listAffordanceButtonConfirmed: getByTestId(
				'listAfterAffordance__listAffordanceButton--confirmed--test-id'
			),
			listAffordanceButtonClose: getByTestId(
				'listAfterAffordance__listAffordanceButton--close--test-id'
			)
		}))

		expect(listAffordanceButtonConfirmed).toBeTruthy()
		expect(listAffordanceButtonClose).toBeTruthy()
	})

	it('does not render when visible is false', async () => {
		const {getByTestId} = renderWithTheme(
			<ListAfterAffordance
				visible={false}
				indexKey='item-2'
				testID='listAfterAffordance'
			/>
		)

		const listAfterAffordance = await waitFor(() => getByTestId('listAfterAffordance'))

		expect(listAfterAffordance.props.pointerEvents).toBe('none')
	})

	it('renders animated danger element', async () => {
		const {getByTestId} = renderWithTheme(
			<ListAfterAffordance
				visible
				indexKey='item-3'
			/>
		)

		const animatedDanger = await waitFor(() => getByTestId('listAfterAffordance__animatedDanger--test-id'))

		expect(animatedDanger).toBeTruthy()
	})

	it('calls onConfirm with correct params on press', async () => {
		const onConfirm = jest.fn()
		const {getByTestId} = renderWithTheme(
			<ListAfterAffordance
				visible
				indexKey='key-1'
				onConfirm={onConfirm}
			/>
		)

		const confirmButton = await waitFor(() =>
			getByTestId('listAfterAffordance__listAffordanceButton--confirmed--test-id')
		)

		fireEvent(confirmButton, 'onPressOut', {})
		await waitFor(() => expect(onConfirm).toHaveBeenCalledWith({indexKey: 'key-1'}))
	})

	it('calls onCancel with toggled doubleConfirmed state', async () => {
		const onCancel = jest.fn()
		const {getByTestId} = renderWithTheme(
			<ListAfterAffordance
				visible
				indexKey='key-2'
				onCancel={onCancel}
			/>
		)

		const cancelButton = await waitFor(() =>
			getByTestId('listAfterAffordance__listAffordanceButton--close--test-id')
		)

		fireEvent(cancelButton, 'onPressOut', {})
		await waitFor(() => expect(onCancel).toHaveBeenCalledWith({indexKey: 'key-2'}))
	})
})
