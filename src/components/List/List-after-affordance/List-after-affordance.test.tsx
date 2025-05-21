import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../../__test__'
import {ListAfterAffordance} from './List-after-affordance.component'

describe('ListAfterAffordance Component', () => {
	it('should renders both confirm and cancel buttons by default', async () => {
		const {getByTestId} = await renderWithAct(
			<ListAfterAffordance
				indexKey='item-1'
				visible
			/>
		)

		const {confirmed, close} = await waitFor(() => ({
			close: getByTestId('listAfterAffordance__listAffordanceButton--close--test-id'),
			confirmed: getByTestId('listAfterAffordance__listAffordanceButton--confirmed--test-id')
		}))

		expect(close).toBeTruthy()
		expect(confirmed).toBeTruthy()
	})

	it('should does not render when visible is false', async () => {
		const {getByTestId} = await renderWithAct(
			<ListAfterAffordance
				indexKey='item-2'
				testID='listAfterAffordance'
				visible={false}
			/>
		)

		const afterAffordance = await waitFor(() => getByTestId('listAfterAffordance'))

		expect(afterAffordance.props.pointerEvents).toBe('none')
	})

	it('should renders animated danger element', async () => {
		const {getByTestId} = await renderWithAct(
			<ListAfterAffordance
				indexKey='item-3'
				visible
			/>
		)

		const danger = await waitFor(() => getByTestId('listAfterAffordance__animatedDanger--test-id'))

		expect(danger).toBeTruthy()
	})

	it('should calls onConfirm with correct params on press', async () => {
		const onConfirm = jest.fn()
		const {getByTestId} = await renderWithAct(
			<ListAfterAffordance
				indexKey='key-1'
				onConfirm={onConfirm}
				visible
			/>
		)

		const confirmed = await waitFor(() =>
			getByTestId('listAfterAffordance__listAffordanceButton--confirmed--test-id')
		)

		await act(async () => fireEvent(confirmed, 'pressOut', {}))
		await waitFor(() => expect(onConfirm).toHaveBeenCalledWith({indexKey: 'key-1'}))
	})

	it('should calls onCancel with toggled doubleConfirmed state', async () => {
		const onCancel = jest.fn()
		const {getByTestId} = await renderWithAct(
			<ListAfterAffordance
				visible
				indexKey='key-2'
				onCancel={onCancel}
			/>
		)

		const cancel = await waitFor(() =>
			getByTestId('listAfterAffordance__listAffordanceButton--close--test-id')
		)

		await act(async () => fireEvent(cancel, 'pressOut', {}))
		await waitFor(() => expect(onCancel).toHaveBeenCalledWith({indexKey: 'key-2'}))
	})
})
