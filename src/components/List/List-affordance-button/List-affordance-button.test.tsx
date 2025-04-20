import {fireEvent, waitFor} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../../__test__'
import {ListAffordanceButton} from './List-affordance-button.component'

jest.useFakeTimers()

describe('ListAffordanceButton', () => {
	it('should render label text correctly', async () => {
		const {getByTestId, getByText} = renderWithTheme(<ListAffordanceButton labelText='Delete' />)

		await waitFor(() => {
			jest.runAllTimers()
			expect(getByTestId('listAffordanceButton--test-id')).toBeTruthy()
			expect(getByTestId('listAffordanceButton__animatedLabelText--test-id')).toBeTruthy()
			expect(getByText('Delete')).toBeTruthy()
		})
	})

	it('should render with custom icon if provided', async () => {
		const CustomIcon = () => <></>
		const {queryByTestId} = renderWithTheme(<ListAffordanceButton icon={<CustomIcon />} />)

		await waitFor(() => {
			jest.runAllTimers()
			expect(queryByTestId(/^listAffordanceButton__animatedLabelText--/)).toBeNull()
		})
	})

	it('should apply backgroundUnderlay style', async () => {
		const {getByTestId} = renderWithTheme(<ListAffordanceButton />)

		await waitFor(() => {
			jest.runAllTimers()
			expect(getByTestId('listAffordanceButton__animatedBackgroundUnderlay--test-id')).toBeTruthy()
		})
	})

	it('should respond to touch event if not disabled', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<ListAffordanceButton onPressOut={onPressOut} />)
		const touchable = getByTestId('listAffordanceButton__touchable--test-id')

		await waitFor(() => {
			jest.runAllTimers()
			fireEvent(touchable, 'pressOut')
			expect(onPressOut).toHaveBeenCalled()
		})
	})

	it('should not trigger press if disabled', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(
			<ListAffordanceButton
				disabled
				onPressOut={onPressOut}
			/>
		)

		const touchable = getByTestId('listAffordanceButton__touchable--test-id')

		await waitFor(() => {
			jest.runAllTimers()
			fireEvent(touchable, 'pressOut')
			expect(onPressOut).not.toHaveBeenCalled()
		})
	})

	it('should render underlay background and content correctly', async () => {
		const {getByTestId} = renderWithTheme(<ListAffordanceButton />)

		await waitFor(() => {
			jest.runAllTimers()
			expect(getByTestId('listAffordanceButton__underlay--test-id')).toBeTruthy()
			expect(getByTestId('listAffordanceButton__content--test-id')).toBeTruthy()
		})
	})
})
