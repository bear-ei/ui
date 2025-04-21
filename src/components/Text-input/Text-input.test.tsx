import {fireEvent} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {TextInput} from './Text-input.component'

describe('TextInput', () => {
	it('should render correctly with label and placeholder', () => {
		const {getByTestId} = renderWithTheme(
			<TextInput
				testID='textInput'
				labelText='Email'
				placeholder='Enter email'
			/>
		)

		expect(getByTestId('textInput')).toBeTruthy()
	})

	it('should focus input on press', () => {
		const {getByTestId} = renderWithTheme(
			<TextInput
				testID='textInput'
				labelText='Email'
				placeholder='Enter email'
			/>
		)

		const touchable = getByTestId('textInput__touchableHeader--test-id')
		const input = getByTestId('textInput__animatedTextInput--test-id')

		fireEvent.press(touchable)
		expect(input).toBeTruthy()
	})

	it('should trigger onChangeText', () => {
		const onChangeText = jest.fn()
		const {getByTestId} = renderWithTheme(
			<TextInput
				testID='textInput'
				labelText='Email'
				placeholder='Enter email'
				onChangeText={onChangeText}
			/>
		)

		const input = getByTestId('textInput__animatedTextInput--test-id')

		fireEvent.changeText(input, 'hello')
		expect(onChangeText).toHaveBeenCalledWith('hello')
	})
})
