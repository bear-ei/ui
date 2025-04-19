import {fireEvent} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

describe('IconButton', () => {
	it('should render the IconButton correctly with provided testID', () => {
		const {getByTestId} = renderWithTheme(
			<IconButton
				testID='mocked'
				type={ICON_BUTTON_TYPE.FILLED}
				disabled={true}
			/>
		)

		expect(getByTestId('mocked')).toBeTruthy()
	})

	it('should trigger state change correctly when icon button is clicked', () => {
		const mockStateChange = jest.fn()
		const {getByTestId} = renderWithTheme(
			<IconButton
				testID='clickable'
				type={ICON_BUTTON_TYPE.OUTLINED}
				onPressOut={mockStateChange}
			/>
		)

		fireEvent(getByTestId('iconButton__touchable--test-id'), 'pressOut')
		expect(mockStateChange).toHaveBeenCalled()
	})
})
