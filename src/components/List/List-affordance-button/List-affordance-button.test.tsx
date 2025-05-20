import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {ListAffordanceButton} from './List-affordance-button.component'

describe('ListAffordanceButton', () => {
	it('should renders label text correctly when no icon provided', async () => {
		const {getByTestId, getByText} = renderWithTheme(<ListAffordanceButton labelText='Action' />)
		const {listAffordanceButtonAction, listAffordanceButton} = await waitFor(() => ({
			listAffordanceButtonAction: getByText('Action'),
			listAffordanceButton: getByTestId('listAffordanceButton__animatedLabelText--test-id')
		}))

		expect(listAffordanceButtonAction).toBeTruthy()
		expect(listAffordanceButton).toBeTruthy()
	})

	it('should renders custom icon instead of labelText when provided', async () => {
		const {queryByTestId, getByText} = renderWithTheme(
			<ListAffordanceButton
				icon={<Text>🔔</Text>}
				labelText='ShouldNotRender'
			/>
		)

		const {listAffordanceButtonIcon, listAffordanceButton} = await waitFor(() => ({
			listAffordanceButtonIcon: getByText('🔔'),
			listAffordanceButton: queryByTestId('listAffordanceButton__animatedLabelText--test-id')
		}))

		expect(listAffordanceButtonIcon).toBeTruthy()
		expect(listAffordanceButton).toBeNull()
	})

	it('should applies backgroundUnderlayAnimatedStyle and labelTextAnimatedStyle', async () => {
		const {getByTestId} = renderWithTheme(<ListAffordanceButton labelText='Styled Button' />)
		const {backgroundUnderlay, animatedLabelText} = await waitFor(() => ({
			backgroundUnderlay: getByTestId('listAffordanceButton__backgroundUnderlay--test-id'),
			animatedLabelText: getByTestId('listAffordanceButton__animatedLabelText--test-id')
		}))

		expect(backgroundUnderlay).toBeTruthy()
		expect(animatedLabelText).toBeTruthy()
	})

	it('should uses custom testID if provided', async () => {
		const {getByTestId} = renderWithTheme(
			<ListAffordanceButton
				testID='customAffordance'
				labelText='X'
			/>
		)

		const customAffordance = await waitFor(() => getByTestId('customAffordance'))

		expect(customAffordance).toBeTruthy()
	})
})
