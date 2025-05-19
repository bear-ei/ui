import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'

describe('Button Component', () => {
	it('should renders with default props', async () => {
		const {getByTestId} = renderWithTheme(<Button testID='button' />)
		const {button, buttonAnimatedLabelText} = await waitFor(() => ({
			button: getByTestId('button'),
			buttonAnimatedLabelText: getByTestId('button__animatedLabelText--test-id')
		}))

		expect(button).toBeTruthy()
		expect(buttonAnimatedLabelText.props.children).toBe('Label')
	})

	it('should renders with different BUTTON_TYPE.FILLED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				type={BUTTON_TYPE.FILLED}
				testID={`button-${BUTTON_TYPE.FILLED}`}
				loading
			/>
		)

		const button = await waitFor(() => getByTestId(`button-${BUTTON_TYPE.FILLED}`))

		expect(button).toBeTruthy()
	})

	it('should renders with different BUTTON_TYPE.OUTLINED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				type={BUTTON_TYPE.OUTLINED}
				testID={`button-${BUTTON_TYPE.OUTLINED}`}
			/>
		)

		const button = await waitFor(() => getByTestId(`button-${BUTTON_TYPE.OUTLINED}`))

		expect(button).toBeTruthy()
	})

	it('should renders icon when provided', async () => {
		const icon = <Text>🔥</Text>
		const {getByTestId} = renderWithTheme(
			<Button
				testID='icon-button'
				icon={icon}
			/>
		)

		const {button, buttonIcon} = await waitFor(() => ({
			button: getByTestId('icon-button'),
			buttonIcon: getByTestId('button__iconLayout--test-id')
		}))

		expect(button).toBeTruthy()
		expect(buttonIcon).toBeTruthy()
	})

	it('should renders underlay and elevation correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='underlay-button'
				type={BUTTON_TYPE.ELEVATED}
			/>
		)

		const {buttonBackground, buttonElevation} = await waitFor(() => ({
			buttonBackground: getByTestId('button__backgroundUnderlay--test-id'),
			buttonElevation: getByTestId('button__elevation--test-id')
		}))

		expect(buttonBackground).toBeTruthy()
		expect(buttonElevation).toBeTruthy()
	})

	it('should does not render elevation for non-elevated buttons', async () => {
		const {queryByTestId} = renderWithTheme(
			<Button
				testID='non-elevated-button'
				type={BUTTON_TYPE.TEXT}
			/>
		)

		const buttonElevation = await waitFor(() => queryByTestId('button__elevation--test-id'))

		expect(buttonElevation).toBeNull()
	})

	it('should shows active indicator for LINK type on interaction', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='link-button'
				type={BUTTON_TYPE.LINK}
			/>
		)

		const buttonActiveIndicatorLayoutAnimated = await waitFor(() =>
			getByTestId('button__activeIndicatorLayoutAnimated--test-id')
		)

		expect(buttonActiveIndicatorLayoutAnimated).toBeTruthy()
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<Button onPressOut={onPressOut} />)
		const touchable = await waitFor(() => getByTestId('button__touchable--test-id'))

		fireEvent(touchable, 'pressOut')

		await waitFor(() => {
			expect(onPressOut).toHaveBeenCalled()
		})
	})
})
