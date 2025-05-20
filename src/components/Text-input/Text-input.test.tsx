import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {Icon, ICON_NAME} from '../Icon'
import {TextInput} from '../Text-input'

describe('TextInput Component', () => {
	it('should renders with label and placeholder', async () => {
		const {getByTestId, getByText} = await renderWithAct(
			<TextInput
				labelText='Username'
				placeholder='Enter name'
				testID='textInput'
			/>
		)

		const {textInput, labelText} = await waitFor(() => ({
			textInput: getByTestId('textInput'),
			labelText: getByText('Username')
		}))

		expect(textInput).toBeTruthy()
		expect(labelText).toBeTruthy()
	})

	it('should renders defaultValue', async () => {
		const {getByDisplayValue} = await renderWithAct(
			<TextInput
				defaultValue='default'
				testID='textInput'
			/>
		)

		const displayValue = await waitFor(() => getByDisplayValue('default'))

		expect(displayValue).toBeTruthy()
	})

	it('should triggers onChangeText callback', async () => {
		const onChangeText = jest.fn()
		const {getByTestId} = await renderWithAct(
			<TextInput
				onChangeText={onChangeText}
				testID='textInput'
			/>
		)

		const textInput = await waitFor(() => getByTestId('textInput__animatedTextInput--test-id'))

		await act(async () => fireEvent(textInput, 'changeText', 'hello'))
		await waitFor(() => expect(onChangeText).toHaveBeenCalledWith('hello'))
	})

	it('should displays supporting text and allows close', async () => {
		const {getByText} = await renderWithAct(
			<TextInput
				supportingText='Required field'
				testID='textInput'
			/>
		)

		const supportingText = await waitFor(() => getByText('Required field'))

		expect(supportingText).toBeTruthy()
	})

	it('should renders with leading and trailing icons', async () => {
		const leading = (
			<Icon
				name={ICON_NAME.HOME}
				testID='leadingIcon'
			/>
		)
		const trailing = (
			<Icon
				name={ICON_NAME.BOX}
				testID='trailingIcon'
			/>
		)

		const {getByTestId} = await renderWithAct(
			<TextInput
				leading={leading}
				trailing={trailing}
				testID='textInput'
			/>
		)

		const {leadingIcon, trailingIcon} = await waitFor(() => ({
			leadingIcon: getByTestId('leadingIcon'),
			trailingIcon: getByTestId('trailingIcon')
		}))

		expect(leadingIcon).toBeTruthy()
		expect(trailingIcon).toBeTruthy()
	})
})
