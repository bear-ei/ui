import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {ListAffordanceButton} from './List-affordance-button.component'

describe('ListAffordanceButton', () => {
	it('should renders label text correctly when no icon provided', async () => {
		const {getByTestId, getByText} = await renderWithAct(<ListAffordanceButton labelText='Action' />)
		const {action, labelText} = await waitFor(() => ({
			action: getByText('Action'),
			labelText: getByTestId('listAffordanceButton__animatedLabelText--test-id')
		}))

		expect(action).toBeTruthy()
		expect(labelText).toBeTruthy()
	})

	it('should renders custom icon instead of labelText when provided', async () => {
		const {queryByTestId, getByText} = await renderWithAct(
			<ListAffordanceButton
				icon={<Text>🔔</Text>}
				labelText='ShouldNotRender'
			/>
		)

		const {text, labelText} = await waitFor(() => ({
			labelText: queryByTestId('listAffordanceButton__animatedLabelText--test-id'),
			text: getByText('🔔')
		}))

		expect(labelText).toBeNull()
		expect(text).toBeTruthy()
	})

	it('should applies backgroundUnderlayAnimatedStyle and labelTextAnimatedStyle', async () => {
		const {getByTestId} = await renderWithAct(<ListAffordanceButton labelText='Styled Button' />)
		const {backgroundUnderlay, labelText} = await waitFor(() => ({
			backgroundUnderlay: getByTestId('listAffordanceButton__backgroundUnderlay--test-id'),
			labelText: getByTestId('listAffordanceButton__animatedLabelText--test-id')
		}))

		expect(backgroundUnderlay).toBeTruthy()
		expect(labelText).toBeTruthy()
	})

	it('should uses custom testID if provided', async () => {
		const {getByTestId} = await renderWithAct(
			<ListAffordanceButton
				labelText='X'
				testID='customAffordance'
			/>
		)

		const affordance = await waitFor(() => getByTestId('customAffordance'))

		expect(affordance).toBeTruthy()
	})
})
