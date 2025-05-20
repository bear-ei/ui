import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'

describe('Button Component', () => {
	it('should renders with default props', async () => {
		const {getByTestId} = renderWithTheme(<Button testID='button' />)
		const {button, labelText} = await waitFor(() => ({
			button: getByTestId('button'),
			labelText: getByTestId('button__animatedLabelText--test-id')
		}))

		expect(button).toBeTruthy()
		expect(labelText.props.children).toBe('Label')
	})

	it('should renders with different BUTTON_TYPE.FILLED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				loading
				testID={`button-${BUTTON_TYPE.FILLED}`}
				type={BUTTON_TYPE.FILLED}
			/>
		)

		const button = await waitFor(() => getByTestId(`button-${BUTTON_TYPE.FILLED}`))

		expect(button).toBeTruthy()
	})

	it('should renders with different BUTTON_TYPE.OUTLINED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID={`button-${BUTTON_TYPE.OUTLINED}`}
				type={BUTTON_TYPE.OUTLINED}
			/>
		)

		const button = await waitFor(() => getByTestId(`button-${BUTTON_TYPE.OUTLINED}`))

		expect(button).toBeTruthy()
	})

	it('should renders icon when provided', async () => {
		const icon = <Text>🔥</Text>
		const {getByTestId} = renderWithTheme(
			<Button
				icon={icon}
				testID='icon-button'
			/>
		)

		const {button, iconLayout} = await waitFor(() => ({
			button: getByTestId('icon-button'),
			iconLayout: getByTestId('button__iconLayout--test-id')
		}))

		expect(button).toBeTruthy()
		expect(iconLayout).toBeTruthy()
	})

	it('should renders underlay and elevation correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='underlay-button'
				type={BUTTON_TYPE.ELEVATED}
			/>
		)

		const {underlay, elevation} = await waitFor(() => ({
			elevation: getByTestId('button__elevation--test-id'),
			underlay: getByTestId('button__backgroundUnderlay--test-id')
		}))

		expect(elevation).toBeTruthy()
		expect(underlay).toBeTruthy()
	})

	it('should does not render elevation for non-elevated buttons', async () => {
		const {queryByTestId} = renderWithTheme(
			<Button
				testID='non-elevated-button'
				type={BUTTON_TYPE.TEXT}
			/>
		)

		const elevation = await waitFor(() => queryByTestId('button__elevation--test-id'))

		expect(elevation).toBeNull()
	})

	it('should shows active indicator for LINK type on interaction', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='link-button'
				type={BUTTON_TYPE.LINK}
			/>
		)

		const indicatorLayout = await waitFor(() =>
			getByTestId('button__activeIndicatorLayoutAnimated--test-id')
		)

		expect(indicatorLayout).toBeTruthy()
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<Button onPressOut={onPressOut} />)
		const touchable = await waitFor(() => getByTestId('button__touchable--test-id'))

		fireEvent(touchable, 'pressOut')
		await waitFor(() => expect(onPressOut).toHaveBeenCalled())
	})
})
