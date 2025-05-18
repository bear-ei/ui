import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../../__test__'
import {ListAfterAffordance} from './List-after-affordance.component'

jest.useFakeTimers()

describe('ListAfterAffordance', () => {
	const onCancel = jest.fn()
	const onConfirm = jest.fn()
	const baseProps = {
		indexKey: 'item-1',
		visible: true,
		onCancel,
		onConfirm
	}

	it('should render both confirm and cancel buttons', async () => {
		const {getAllByTestId} = renderWithTheme(<ListAfterAffordance {...baseProps} />)

		await waitFor(() => {
			jest.runAllTimers()
			const buttons = getAllByTestId(/^listAfterAffordance__listAffordanceButton--/)
			expect(buttons.length).toBe(2)
		})
	})

	it('should show animated danger element', async () => {
		const {getByTestId} = renderWithTheme(<ListAfterAffordance {...baseProps} />)

		await waitFor(() => {
			jest.runAllTimers()
			expect(getByTestId('listAfterAffordance__animatedDanger--test-id')).toBeTruthy()
		})
	})
})
